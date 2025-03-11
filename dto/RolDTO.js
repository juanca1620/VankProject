import { DataTypes } from 'sequelize';
import { sequelize } from '../database/Connection.js';

const rolDTO = sequelize.define('rol', {
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
    },
    nombre: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
    },
}, {
    freezeTableName: true,
    timestamps: false,
});

export default rolDTO;
