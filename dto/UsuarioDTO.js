import { DataTypes } from 'sequelize';
import { sequelize } from '../database/Connection.js';

const UsuarioDTO = sequelize.define('user', {
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre_completo: {
    type: DataTypes.STRING(150),
    allowNull: false,
    unique: true,
  },
  correo: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true,
  },
  contrasenna: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  telefono: {
    type: DataTypes.STRING(10),
    allowNull: false,
    unique: true,
  },
},{
    freezeTableName : true,
    timestamps: true, 
  });

export default UsuarioDTO;