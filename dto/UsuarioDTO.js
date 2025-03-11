import { DataTypes } from 'sequelize';
import { sequelize } from '../database/Connection.js';

const UsuarioDTO = sequelize.define('usuario', {
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
  rol_id: {
    references: {
        model: 'rol',
        key: 'id'
    },
    type: DataTypes.BIGINT,
}
},{
    freezeTableName : true,
    timestamps: false, 
  });

export default UsuarioDTO;