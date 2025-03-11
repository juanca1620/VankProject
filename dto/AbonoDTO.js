import { DataTypes } from 'sequelize';
import { sequelize } from '../database/Connection.js';

const AbonoDTO = sequelize.define('Abono', {
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoincrement: true,
    },
    total: {
        type: DataTypes.DOUBLE,
        allowNull: false,
    }
}, {
    freezeTableName: true,
    timestamps: true,
});

export default AbonoDTO;

//EN LA BASE DE DATOS NO ESTA LA TABLA