import { DataTypes } from "sequelize";
import { sequelize } from "../database/Connection.js";

const CreditoVendedorDTO = sequelize.define('credito_vendedor', {
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
    },
    fecha_limite: {
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
    monto_pendiente: {
    type: DataTypes.DOUBLE(12,2),
    validate: {
        isCorrect(value) {
            if(!(value >= 0)) {
                throw new Error('El monto pendiente debe ser mayor a 0');
            }
        }
    }
   },
   pendiente: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
   },
   id_factura: {
    references: {
        model: 'factura_vendedor',
        key: 'id',
    }, 
    type: DataTypes.BIGINT
   }
},{
    freezeTableName: true,
    timestamps: false,
});

export default CreditoVendedorDTO;