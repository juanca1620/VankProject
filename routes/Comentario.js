import express from 'express';
import verifyToken from '../middleware/segurity/TokenVerificator.js';
import ComentarioValidator from '../middleware/validator/ComentarioValidator.js';
import ControladorComentario from '../controllers/ControladorComentario.js';
import RepositorioComentario from '../repositories/RepositorioComentario.js';
import RepositorioProducto from '../repositories/RepositorioProductoVendedor.js';
import RepositorioClienteProducto from '../repositories/RepositorioProductoCliente.js';
import RepositorioCliente from '../repositories/RepositorioCliente.js';
import ComentarioService from '../services/ComentarioService.js';

const router = express.Router();

// Crear instancias de los repositorios
const repositorioComentario = new RepositorioComentario();
const repositorioProducto = new RepositorioProducto();
const repositorioClienteProducto = new RepositorioClienteProducto();
const repositorioCliente = new RepositorioCliente();

// Crear instancia del servicio
const comentarioService = new ComentarioService(
    repositorioComentario,
    repositorioProducto,
    repositorioClienteProducto,
    repositorioCliente
);

// Crear instancia del controlador
const controladorComentario = new ControladorComentario(comentarioService);

// Configurar las rutas
router.get('/producto/:id', verifyToken, controladorComentario.obtenerComentariosPorProductoId);
router.get('/cliente/:cliente_id',verifyToken, controladorComentario.obtenerComentariosPorClienteId);
router.post(
    '/',
    verifyToken,
    ComentarioValidator.validacionesCrearComentario,
    ComentarioValidator.validadorComentario,
    controladorComentario.crearComentario
);

export default router;