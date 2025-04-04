import express from 'express';
import  { connectSequelize } from './database/Connection.js';
import bodyParser from 'body-parser';
import vendedor from './routes/vendedor.js';
import auth from './routes/auth.js';
import factura from './routes/FacturaProvedor.js';
import productoProvedor from './routes/ProductoProvedor.js'
import cuponProvedor from "./routes/CuponProvedor.js"
import cuponVendedor from './routes/CuponVendedor.js';
import productoVendedor from "./routes/ProductoVendedor.js"
import comentario from "./routes/Comentario.js"
import cors from 'cors';

// 2. Crear una instancia de la aplicación Express usando 'let'​
let app = express();

app.use(cors({
  origin: '*',
  credentials: true,
  methods: '*',
  allowedHeaders: '*'
}));

// 3. Configurar middlewares​
app.use(bodyParser.json()); // Para parsear el cuerpo de las solicitudes en formato JSON​
app.use(bodyParser.urlencoded({
    extended:
        true
})); // Para parsear el cuerpo de las solicitudes en formato URL-encoded​

app.use('/auth', auth);
app.use('/vendedor', vendedor);
app.use('/facturacion',factura);
app.use('/productoProvedor',productoProvedor)
app.use('/cuponProvedor', cuponProvedor);
app.use('/cuponVendedor', cuponVendedor);
app.use('/productoVendedor', productoVendedor);
app.use('/comentario', comentario);

async function setupServer() {
  try {
    await connectSequelize();
    console.log('✅ Base de datos conectada');
  } catch (error) {
    console.error('❌ Error al conectar la DB:', error);
  }
}

setupServer();

export default app;