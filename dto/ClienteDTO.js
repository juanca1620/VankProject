import {DataTypes} from 'sequelize';
import {sequelize} from '../database/Connection.js';

const ClienteDTO = sequelize.define('cliente', {
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
    },
    balance: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: false,
        validate: {
            min: 0,
        },
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

export default ClienteDTO;