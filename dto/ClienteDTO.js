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

export default ClienteDTO;