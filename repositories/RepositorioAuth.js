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
        const token = jwt.sign(
          { userEmail: info.email },
          process.env.JWT_SECRET,
          { expiresIn: '1h' }
        );
        return { login: true, token }
      }

      async register(usuarioInfo){
        const userCorreo = usuario.findOne({where: {correo: usuarioInfo.correo}});
        if(userCorreo){
          return {error: "Correo ya registrado",code : 400};
        }
        const userTelefono = usuario.findOne({where: {telefono: usuarioInfo.telefono}});
        if(userTelefono){
          return {error: "Telefono ya registrado" , code : 400};
        }
        
        const contrasennaHash = await bcrypt.hash(usuarioInfo.contrasenna, 10);
        const usuarioJSON = {
          nombre_completo: usuarioInfo.nombre_completo,
          correo: usuarioInfo.correo,
          contrasenna: contrasennaHash,
          telefono: usuarioInfo.telefono
        }

        const usuarioCreado = usuario.create(usuarioJSON);
        delete usuarioCreado.contrasenna;
        let usuarioRol;
        let nombreUsuario;

        switch(usuarioInfo.tipo){
          case 'cliente':
            usuarioRol = cliente.create({balance: 0, usuario_id: usuarioCreado.id});
            nombreUsuario = 'cliente';
            break;
          case 'vendedor':
            usuarioRol = vendedor.create({usuario_id: usuarioCreado.id});
            nombreUsuario = 'vendedor';
            break;
          case 'provedor':
            usuarioRol = provedor.create({usuario_id: usuarioCreado.id});
            nombreUsuario = 'provedor';
            break;
        }

        usuarioCreado.rol = {
          nombreUsuario : nombreUsuario,
          usuarioRolId : usuarioRol.id
        }

        token = jwt.sign(
          { userId: usuarioCreado.id ,
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