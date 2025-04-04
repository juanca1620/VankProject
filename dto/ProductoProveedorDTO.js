import { DataTypes, DECIMAL } from 'sequelize';
import { sequelize } from '../database/Connection.js';

const productoProvedorDTO = sequelize.define("producto_proveedor", {
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
    },
    nombre:{
        type: DataTypes.STRING(100),
        allowNull: false,
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
    cantidad_min: {
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
    proveedor_id: {
        references: {
            model: 'vendedor',
            key: 'id'
        },
        type: DataTypes.BIGINT
    }
},{
    freezeTableName: true,
    timestamps: false,
});

export default productoProvedorDTO;

