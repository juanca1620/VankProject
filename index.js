import express from 'express';
import  { connectSequelize } from './database/Connection.js';
import bodyParser from 'body-parser';
import vendedor from "./routes/Vendedor.js";
import auth from './routes/Auth.js';
import factura from './routes/FacturaProvedor.js';
import productoProvedor from './routes/ProductoProvedor.js'
import cuponProvedor from "./routes/CuponProvedor.js"
import cuponVendedor from './routes/CuponVendedor.js';
import productoVendedor from "./routes/ProductoVendedor.js"
import comentario from "./routes/Comentario.js"
import FacturaVendedor  from "./routes/FacturaVendedor.js"
import Comentario from "./routes/Comentario.js"
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
app.use('/facturaVendedor', FacturaVendedor);
app.use("/comentario", Comentario);

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

export default app;