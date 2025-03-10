import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

console.log('DB_HOST:', process.env.DB_HOST);
console.log('DB_USER:', process.env.DB_USER);
console.log('DB_PASSWORD:', process.env.DB_PASSWORD);
console.log('DB_NAME:', process.env.DB_NAME);
console.log('DB_DIALECT:', process.env.DB_DIALECT);
console.log('DB_PORT:', process.env.DB_PORT);

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: process.env.DB_DIALECT,
  port: process.env.DB_PORT,
  dialectOptions: {
      ssl: false
  }
});

async function connectSequelize() {
  try {
    await sequelize.authenticate();
    console.log('Conectado a Postgres con Sequelize');
    await sequelize.sync();
  } catch (error) {
    console.error('Error conectando a Postgres:', error);
    throw error;
  }
}

connectSequelize();
export { sequelize, connectSequelize };
