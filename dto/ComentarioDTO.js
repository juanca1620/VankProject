 {}
ae    
ae
const ComentarioDTO = Sequelize.define('comentario', {
    id: {
        type: DataTypes.BIGINT,
        primarykey: true,
        autoincrement: true,
    },
    contenido: {
        type: DataTypes.String,
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