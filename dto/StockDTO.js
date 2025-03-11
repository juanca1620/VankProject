import {DataTypes} from 'sequelize';
import {sequelize} from '../database/Connection.js';

const Stock = sequelize.define('stock', {
    id: {
        type: DataTypes.BIGINT,
        primarykey: true,
        autoincrement: true,
    },
    cantidad: {
        type: DataType.BIGINT,
        allowNull: false,
    }
},{
    freezeTableName: true,
    timestamps: false,
});

export default StockDTO;