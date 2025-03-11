import {DataTypes} from 'sequelize';
import {sequelize} from '/database/Conetion.js';

const ChatDTO = sequelize.define('chat', {
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
    }, 
    terminado: {
        type: DataTypes.BOOLEAN,
    },
},{
    freezeTableName: true,
    timestamps: false,
});

export default ChatDTO;