import { DataTypes } from "sequelize";
import { sequelize } from "../database/Connection.js";

const FacturaVendedorDTO = sequelize.define('factura_vendedor', {
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
    type: DataTypes.DOUBLE(3,2),
    validate: {
        isCorrect(value) {
            if(!(value > 0 && value < 100)) {
                throw new Error('El descuento debe ser mayor al 0% y menor al 100% del valor total');
            }
        }
    }
   },
   vendedor_id: {
    references: {
        model: 'vendedor',
        key: 'id',
    },
    type: DataTypes.BIGINT
   }, 
   cliente_id: {
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

export default FacturaVendedorDTO;