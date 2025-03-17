import { DataTypes } from "sequelize";
import { sequelize } from "../database/Connection.js";

const CuponVendedorDTO = sequelize.define('cupon_vendedor', {
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
   id_vendedor: {
    references: {
        model: 'vendedor',
        key: 'id',
    }, 
    type: DataTypes.BIGINT
   }
},{
    freezeTableName: true,
    timestamps: false,
});

export default CuponVendedorDTO;