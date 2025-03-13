import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import repo from '../../repositories/RepositorioAuth.js';
dotenv.config(); 


const verifyToken = async (req, res, next) => {
  const repoVerifator = new repo();
    const authHeader = req.headers['authorization'];
  
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Token no proporcionado o inválido' });
    }
  
    const token = authHeader.split(' ')[1];
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.email = decoded.email;
      req.contrasenna = decoded.contrasenna;

      const info = {email: req.email, contrasenna: req.contrasenna}
      const reponse = await repoVerifator.checkTokenHashedPassword(info);
      
      if(!reponse){
        return res.status(401).json({ message: 'Token inválido o expirado' });
      }
      
      next();
    } catch (error) {
      console.error('Error al verificar el token:', error.message);
      if(error.message === 'jwt expired'){
        return res.status(401).json({ message: 'Token invalido o expirado' });
      }
      res.status(500).json({ message: error.message });
    }
  };

export default verifyToken;