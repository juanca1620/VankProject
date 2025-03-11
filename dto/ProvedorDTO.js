import {DataTypes} from 'sequelize';
import {sequelize} from '../database/Connection.js';

const ProveedorDTO = sequelize.define('proveedor', {
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
    },
    usuario_id: {
        references: {
            model: 'usuario',
            key: 'id'
        },
        type: DataTypes.BIGINT,
    }
},{
    freezeTableName: true,
    timestamps: false,
});

export default ProveedorDTO;