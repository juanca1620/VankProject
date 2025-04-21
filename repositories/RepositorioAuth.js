import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import usuario from '../dto/UsuarioDTO.js';
import cliente from '../dto/ClienteDTO.js';
import vendedor from '../dto/VendedorDTO.js';
import provedor from '../dto/ProvedorDTO.js';
import { response } from 'express';
import { sendEmail } from '../services/EmailService.js';

dotenv.config();

class RepositorioAuth {

  async checkToken (info){
    const user = await usuario.findOne({ where: { correo: info.email } })

    if (!user) {
      return false;
    }
    const match = await bcrypt.compare(info.contrasenna, user.contrasenna);

    if (!match) {
      return false;
    }

    return true;
  }

  async checkTokenHashedPassword (info){
    const user = await usuario.findOne({ where: { correo: info.email } })

    if (!user) {
      return false;
    }
    const match = user.contrasenna === info.contrasenna;
    
    if (!match) {
      return false;
    }

    return true;
  }

  async login(info) {
    const user = await usuario.findOne({ where: { correo: info.email } });

    const response = await this.checkToken(info)

    if(!response){
      return { error: "Credenciales inválidas", code: 401}
    }

    const usuarioEncontrado = user.toJSON();
    let nombreUsuario;
    let usuarioRol;

    switch (usuarioEncontrado.rol_id) {
      case 1:
        usuarioRol = await cliente.findOne({ where: { usuario_id: usuarioEncontrado.id } });
        nombreUsuario = 'cliente';
        break;
      case 2:
        usuarioRol = await vendedor.findOne({ where: { usuario_id: usuarioEncontrado.id } });
        nombreUsuario = 'vendedor';
        break;
      case 3:
        usuarioRol = await provedor.findOne({ where: { usuario_id: usuarioEncontrado.id } });
        nombreUsuario = 'provedor';
        break;
      default:
        return { error: "Rol no válido", code: 400 };
    }

    usuarioEncontrado.rol = {
      nombreUsuario: nombreUsuario,
      usuarioRolId: usuarioRol.id
    };
    

    const data = {
      email: usuarioEncontrado.correo,
      contrasenna : usuarioEncontrado.contrasenna,
    }
    const token = jwt.sign(data,
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    delete usuarioEncontrado.contrasenna;
    delete usuarioEncontrado.rol_id;

    usuarioEncontrado.token = token;
    return usuarioEncontrado;
  }

  async register(usuarioInfo) {
    const userCorreo = await usuario.findOne({ where: { correo: usuarioInfo.email } });
    if (userCorreo) {
      return { error: "Correo ya registrado", code: 400 };
    }
    const userTelefono = await usuario.findOne({ where: { telefono: usuarioInfo.telefono } });
    if (userTelefono) {
      return { error: "Telefono ya registrado", code: 400 };
    }

    const contrasennaHash = await bcrypt.hash(usuarioInfo.contrasenna, 10);

    let rolId;
    switch (usuarioInfo.rol) {
      case 'cliente':
        rolId = 1;
        break;
      case 'vendedor':
        rolId = 2;
        break;
      case 'provedor':
        rolId = 3;
        break;
      default:
        return { error: "Rol no válido", code: 400 };
    }

    const usuarioJSON = {
      nombre_completo: usuarioInfo.nombre,
      correo: usuarioInfo.email,
      contrasenna: contrasennaHash,
      telefono: usuarioInfo.telefono,
      rol_id: rolId
    };

    const usuarioCreado = (await usuario.create(usuarioJSON)).toJSON();

    const data = {
      email: usuarioCreado.correo,
      contrasenna : usuarioCreado.contrasenna,
    }

    let usuarioRol;
    let nombreUsuario;

    switch (rolId) {
      case 1:
        usuarioRol = (await cliente.create({ balance: 0, usuario_id: usuarioCreado.id })).toJSON();
        nombreUsuario = 'cliente';
        break;
      case 2:
        usuarioRol = (await vendedor.create({ usuario_id: usuarioCreado.id })).toJSON();
        nombreUsuario = 'vendedor';
        break;
      case 3:
        usuarioRol = (await provedor.create({ usuario_id: usuarioCreado.id })).toJSON();
        nombreUsuario = 'provedor';
        break;
    }

    sendEmail(
      usuarioCreado.correo,
      'Bienvenido a la plataforma',
      `Hola ${usuarioCreado.nombre_completo}, tu cuenta ha sido creada exitosamente.`
    );
    
    usuarioCreado.rol = {
      nombreUsuario: nombreUsuario,
      usuarioRolId: usuarioRol.id
    };

    const token = jwt.sign(data,
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    delete usuarioCreado.contrasenna;

    usuarioCreado.token = token;
    return usuarioCreado;
  }
}

export default RepositorioAuth;