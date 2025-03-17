import { DataTypes } from "sequelize";
import { sequelize } from "../database/Connection.js";

const ItemFacturaVendedorDTO = sequelize.define('item_factura_vendedor', {
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
    },
    cantidad_producto: {
        type: DataTypes.BIGINT,
        defaultValue: 0,
    },
    producto_id: {
        references: {
            model: 'producto_vendedor',
            key: 'id',
        },
        type: DataTypes.BIGINT,
    },
    factura_id: {
        references: {
            model: 'factura_vendedor',
            key: 'id',
        },
        type: DataTypes.BIGINT,
    }
}, {
    freezeTableName: true,
    timestamps: false,
});

export default ItemFacturaVendedorDTO;