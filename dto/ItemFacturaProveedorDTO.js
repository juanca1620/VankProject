import { DataTypes } from "sequelize";
import { sequelize } from "../database/Connection.js";

const ItemFacturaProveedorDTO = sequelize.define('item_factura_proveedor', {
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
    },
    cantidad_producto: {
        type:DataTypes.BIGINT
        
    },
    producto_id: {
        references : {
            model : "producto_proveedor",
            key : "id"
        },
        type : DataTypes.BIGINT
    },
    factura_id: {
        references: {
            model : "factura_proveedor",
            key : "id"
        },
        type : DataTypes.BIGINT
    }
},{
    freezeTableName: true,
    timestamps: false,
});

export default ItemFacturaProveedorDTO;