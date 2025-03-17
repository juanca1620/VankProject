import { DataTypes } from "sequelize";
import { sequelize } from "../database/Connection.js";

const CuponProveedorDTO = sequelize.define('cupon_proveedor', {
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
    },
    descuento_porcentaje: {
        type: DataTypes.DOUBLE(3,2),
        allowNull: false,

        validate: {
            isCorrect(value) {
                if(value < 0 || value > 100) {
                    throw new Error('El descuento debe ser mayor a 0 y menor a 100');
                }
            }
        }
    },
   id_proveedor: {
    references: {
        model: 'proveedor',
        key: 'id',
    }, 
    type: DataTypes.BIGINT
   }
},{
    freezeTableName: true,
    timestamps: false,
});

export default CuponProveedorDTO;