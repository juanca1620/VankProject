const env = require('dotenv').config();
const mysql = require('mysql');

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: ''
});

connection.connect((err) => {
    if(err) throw "Error en la conexión de la base de datos "+ err;
});