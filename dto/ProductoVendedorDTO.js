import { DataTypes } from "sequelize";
import { sequelize } from "../database/Connection.js"

const productoVendedorDTO = sequelize.define('producto_vendedor', {
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
                        throw new Error('El nombre del producto debe tener entre 1 y 100 caracteres');
                    }
                }
            }
        },
        precio : {
            type: DataTypes.DOUBLE(10,2),
            allowNull: false,
            validate: {
                isCorrect(value) {
                    if(value < 0) {
                        throw new Error('El precio debe ser mayor a 0');
                    }
                }
            }
        },
        importancia : {
            type : DataTypes.INTEGER,
            defaultValue : 0,
            validate : {
                isCorrect(value) {
                    if(value < 0) {
                        throw new Error('La importancia debe ser un valor positivo');
                    }
                }
            }
        },
        descripcion : {
            type : DataTypes.STRING(1000),
            allowNull : false,
            validate : {
                isCorrect(value) {
                    if(value.length < 1 || value.length > 1000) {
                        throw new Error('La descripcion del producto debe tener entre 1 y 1000 caracteres');
                    }
                }
            }
        },
        url_imagen : {
            type : DataTypes.STRING(1000),
            allowNull : false,
            validate : {
                isCorrect(value) {
                    if(value.length < 1 || value.length > 1000) {
                        throw new Error('La url de la imagen debe tener entre 1 y 1000 caracteres');
                    }
                }
            }
        },
        publicado : {
            type : DataTypes.BOOLEAN,
            defaultValue : false
        },
        vendedor_id : {
            references: {
                model: 'vendedor',
                key: 'id'
            },
            type: DataTypes.BIGINT,
        },
        stock_id : {
            references: {
                model: 'stock',
                key: 'id'
            },
            type: DataTypes.BIGINT,
        }
},{
    freezeTableName: true,
    timestamps: false,
})

export default productoVendedorDTO;