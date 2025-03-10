import express from 'express';
import  { connectSequelize } from './database/Connection.js';
import bodyParser from 'body-parser';
import vendedor from './routes/vendedor.js';
import auth from './routes/Auth.js';
import factura from './routes/factura.js';

// 2. Crear una instancia de la aplicación Express usando 'let'​
let app = express();

// 3. Configurar middlewares​
app.use(bodyParser.json()); // Para parsear el cuerpo de las solicitudes en formato JSON​
app.use(bodyParser.urlencoded({
    extended:
        true
})); // Para parsear el cuerpo de las solicitudes en formato URL-encoded​

app.use('/auth', auth);
app.use('/vendedor', vendedor);
app.use('/facturacion',factura);



async function startServer() {
  try {
    await connectSequelize();
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Error iniciando la aplicación:', error);
  }
}

startServer();