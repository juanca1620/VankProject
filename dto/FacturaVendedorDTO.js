import { DataTypes } from "sequelize";
import { sequelize } from "../database/Connection.js";

const FacturaVendedorDTO = sequelize.define('item_factura_proveedor', {
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
            const day = String(localDate.getDate()).padStart(2, '0');
            const month = String(localDate.getMonth() + 1).padStart(2, '0');
            const year = localDate.getFullYear();
            return `${day}/${month}/${year}`; // Formato 'DD/MM/YYYY'
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
   provedor_id: {
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