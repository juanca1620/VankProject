import { DataTypes } from "sequelize";
import { sequelize } from "../database/Connection.js";

const FacturaProvedorDTO = sequelize.define('factura_proveedor', {
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
    },
    valor_total: {
        type: DataTypes.DOUBLE(12,2),
        allowNull: false,

        validate: {
            isPositive(value) {
                if(value < 0) {
                    throw new Error('El valor total no puede ser negativo');
                }
            }
        }
    },
    fecha: {
        type: DataTypes.DATEONLY,
        defaultValue: () => {
            const localDate = new Date();
            localDate.setMinutes(localDate.getMinutes() - localDate.getTimezoneOffset());
            return localDate.toISOString().split('T')[0]; // Formato 'YYYY-MM-DD'
        }
    },
   descuento_aplicado: {
    type: DataTypes.DOUBLE(5,2),
    defaultValue:0
   },
   vendedor_id: {
    references: {
        model: 'vendedor',
        key: 'id',
    },
    type: DataTypes.BIGINT
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

export default FacturaProvedorDTO;