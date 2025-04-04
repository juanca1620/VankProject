import {DataTypes} from 'sequelize';
import {sequelize} from '../database/Connection.js';

const StockDTO = sequelize.define('stock', {
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
    },
    cantidad: {
        type: DataTypes.BIGINT,
        allowNull: false,
    }
},{
    freezeTableName: true,
    timestamps: false,
});

export default StockDTO;