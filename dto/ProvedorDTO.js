import {DataTypes} from 'sequelize';
import {sequelize} from '../database/Connection.js';

const ProveedorDTO = sequelize.define('proveedor', {
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
    }, 
    usuario_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: {
            model: 'user',
            key: 'id',
        },
    },
},{
    freezeTableName: true,
    timestamps: true,
});

export default ProveedorDTO;