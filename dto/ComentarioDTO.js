import {DataTypes} from 'sequelize';
import {sequelize} from '../database/Connection.js';

const ComentarioDTO = sequelize.define('comentario', {
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
    },
    contenido: {
        type: DataTypes.STRING(1000),
        allowNull: false,
    },
    cliente_id: {
        references: {
            model: 'cliente',
            key: 'id'
        },
        type: DataTypes.BIGINT,
    },
    producto_id: {
        references: {
            model: 'producto',
            key: 'id',
        },
        type: DataTypes.BIGINT,
    }
}, {
    freezeTableName: true,
    timestamps: false,
});

export default ComentarioDTO;