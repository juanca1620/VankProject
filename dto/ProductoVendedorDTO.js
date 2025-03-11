import { DataTypes, DECIMAL } from 'sequelize';
import { sequelize } from '../database/Connection.js';

const productoVendedorDTO = sequelize.define("producto_vendedor", {
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
    },
    precio: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,

        validate: {
            isPositive(value) {
                if (value < 0) {
                    throw new Error('El precio debe ser un valor positivo.');
                }
            }
        }
    },
    importacia: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        validate: {
            isPositive(value) {
                if (value < 0) {
                    throw new Error('El precio debe ser un valor positivo.');
                }
            }
        }
    },
    descripcion: {
        type: DataTypes.STRING(1000),
    },
    url_imagen: {
        type: DataTypes.STRING(1000),
        allowNull: false,
    },
    vendedor_id: {
        references: {
            model: 'vendedor',
            key: 'id'
        },
        type: DataTypes.BIGINT
    },
    stock_id: {
        references: {
            model: 'stock',
            key: 'id'
        },
        type: DataTypes.BIGINT
    }
}

)

export default productoVendedorDTO;

