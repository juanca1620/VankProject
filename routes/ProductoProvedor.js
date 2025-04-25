import express from 'express';
import RepositorioProductoProvedor from '../repositories/RepositorioProductoProvedor.js';
import RepositorioProvedor from '../repositories/RepositorioProveedor.js'
import ProductoProvedorService from '../services/ProductoProvedorService.js';
import ControladorProductoProvedor from '../controllers/ControladorProductoProvedor.js';
import validadorAuth from '../middleware/segurity/TokenVerificator.js';
import validator from '../middleware/validator/ProductoProvedorValidator.js'

const router = express.Router();
const repositorio = new RepositorioProductoProvedor();
const repositorioProvedor = new RepositorioProvedor();
const service = new ProductoProvedorService(repositorio,repositorioProvedor);
const controlador = new ControladorProductoProvedor(service);
const autenticador = validadorAuth;

router.get('/buscarPalabra', autenticador, controlador.buscarPorPalabraClave);
router.delete('/:id', autenticador, controlador.eliminarProductoPorId);
router.put('/',validator.validacionesEditarProducto,validator.validadorProductoProvedor, autenticador, controlador.actualizarProducto);
router.get('/provedor/:provedor_id', autenticador, controlador.buscarProductoPorProvedorId);
router.post('/',validator.validacionesCrearEditarProducto,validator.validadorProductoProvedor, autenticador, controlador.crearProducto);
router.get('/:id', autenticador, controlador.buscarProductoPorId);

export default router;

