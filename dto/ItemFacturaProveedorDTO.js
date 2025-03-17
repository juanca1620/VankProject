import { DataTypes } from "sequelize";
import { sequelize } from "../database/Connection.js";

const ItemFacturaProveedorDTO = sequelize.define('item_factura_proveedor', {
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
    },
    cantidad_producto: {
        type:DataTypes.INTEGER
        
    }
},{
    freezeTableName: true,
    timestamps: false,
});

export default ItemFacturaProveedorDTO;