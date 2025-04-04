import express from 'express';
import verifyToken from '../middleware/segurity/tokenVerificator.js';
import RepositorioComentario from '../repositories/RepositorioComentario.js';
import RepositorioProducto from '../repositories/RepositorioProductoProvedor.js';
import ComentarioService from '../services/ComentarioService.js';
import ControladorComentario from '../controllers/ControladorComentario.js';

const router = express.Router();

const repositorioComentario = new RepositorioComentario();
const repositorioProducto = new RepositorioProducto();
const comentarioService = new ComentarioService(repositorioComentario, repositorioProducto);
const controladorComentario = new ControladorComentario(comentarioService);

router.get('/producto/:id', verifyToken, controladorComentario.obtenerComentariosPorProductoId);

export default router;