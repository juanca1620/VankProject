import express from 'express';
import bodyParser from 'body-parser';
import auth from './routes/auth.js';

// 2. Crear una instancia de la aplicación Express usando 'let'​
let app = express();

// 3. Configurar middlewares​
app.use(bodyParser.json()); // Para parsear el cuerpo de las solicitudes en formato JSON​
app.use(bodyParser.urlencoded({
    extended:
        true
})); // Para parsear el cuerpo de las solicitudes en formato URL-encoded​

app.use('/auth', auth);


const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});