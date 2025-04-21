// models/ProductoClienteView.js

const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Ajusta esta ruta según tu proyecto

const ProductoClienteView = sequelize.define('ProductoClienteView', {
  cliente_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  producto_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  precio: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  importancia: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  descripcion: {
    type: DataTypes.STRING,
    allowNull: true
  },
  url_imagen: {
    type: DataTypes.STRING,
    allowNull: true
  },
  vendedor_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  stock_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  publicado: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  }
}, {
  tableName: 'productos_clientes',
  timestamps: false,
  freezeTableName: true
});

module.exports = ProductoClienteView;
