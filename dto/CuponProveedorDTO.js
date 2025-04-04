import { DataTypes } from "sequelize";
import { sequelize } from "../database/Connection.js";

const CuponProveedorDTO = sequelize.define('cupon_proveedor', {
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
    },
    nombre : {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
            isCorrect(value) {
                if(value.length < 1 || value.length > 100) {
                    throw new Error('El nombre del cupon debe tener entre 1 y 100 caracteres');
                }
            }
        }
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
    proveedor_id: {
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