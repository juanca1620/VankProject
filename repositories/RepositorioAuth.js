import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import usuario from '../dto/UsuarioDTO.js'
import cliente from '../dto/ClienteDTO.js';
import vendedor from '../dto/VendedorDTO.js';
import provedor from '../dto/ProvedorDTO.js'
dotenv.config();


class RepositorioAuth {
  async login(info) {
    const user = await usuario.findOne({ where: { correo: info.email } });
    if (!user){
      return { error: "Usuario o contraseña incorrecta", code: 401}
    }
    const match = await bcrypt.compare(info.contrasenna, user.contrasenna);

    if (!match) {
      return { error: "Usuario o contraseña incorrecta", code: 401}
    }
    const token = jwt.sign(
      { userEmail: info.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
    return { token : token };
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
    const usuarioJSON = {
      nombre_completo: usuarioInfo.nombre,
      correo: usuarioInfo.email,
      contrasenna: contrasennaHash,
      telefono: usuarioInfo.telefono
    }

    const usuarioCreado = (await usuario.create(usuarioJSON)).toJSON();
    delete usuarioCreado.contrasenna;
    delete usuarioCreado.createdAt;
    delete usuarioCreado.updatedAt;

    let usuarioRol;
    let nombreUsuario;

    switch (usuarioInfo.rol) {
      case 'cliente':
        usuarioRol = (await cliente.create({ balance: 0, usuario_id: usuarioCreado.id })).toJSON();
        nombreUsuario = 'cliente';
        break;
      case 'vendedor':
        usuarioRol = (await vendedor.create({ usuario_id: usuarioCreado.id })).toJSON();
        nombreUsuario = 'vendedor';
        break;
      case 'provedor':
        usuarioRol = (await provedor.create({ usuario_id: usuarioCreado.id })).toJSON();
        nombreUsuario = 'provedor';
        break;
    }

    usuarioCreado.rol = {
      nombreUsuario: nombreUsuario,
      usuarioRolId: usuarioRol.id
    }

    const token = jwt.sign(
      {
        userId: usuarioCreado.id,
        rol: nombreUsuario
      },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    usuarioCreado.token = token;
    return usuarioCreado;
  }


}

export default RepositorioAuth;