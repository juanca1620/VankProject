import express from 'express';
import verifyToken from '../middleware/segurity/TokenVerificator.js';
import facturaProvedorValidator from '../middleware/validator/FacturaProvedorValidator.js';
import RepositorioFactura from '../repositories/RepositorioFacturaProvedor.js';
import RepositorioItemFactura from '../repositories/RepositorioItemFacturaProvedor.js';
import RepositorioVendedor from '../repositories/RepositorioVendedor.js';
import RepositorioProvedor from '../repositories/RepositorioProveedor.js';
import RepositorioProducto from '../repositories/RepositorioProductoProvedor.js';
import RepositorioCupon from '../repositories/RepositorioCuponProvedor.js';
import RepositorioProductoVendedor from '../repositories/RepositorioProductoVendedor.js';
import RepositorioStock from '../repositories/RepositorioStock.js';
import FacturaProvedorService from '../services/FacturaProvedorService.js';
import ControladorFacturaProvedor from '../controllers/ControladorFacturaProvedor.js';

const router = express.Router();

const repositorioFactura = new RepositorioFactura();
const repositorioItemFactura = new RepositorioItemFactura();
const repositorioVendedor = new RepositorioVendedor();
const repositorioProvedor = new RepositorioProvedor();
const repositorioProducto = new RepositorioProducto();
const repositorioCupon = new RepositorioCupon();
const repositorioProductoVendedor = new RepositorioProductoVendedor();
const repositorioStock = new RepositorioStock();

const servicioFacturaProvedor = new FacturaProvedorService(
    repositorioFactura,
    repositorioItemFactura,
    repositorioVendedor,
    repositorioProvedor,
    repositorioProducto,
    repositorioCupon,
    repositorioProductoVendedor,
    repositorioStock
);

const controladorFacturaProvedor = new ControladorFacturaProvedor(servicioFacturaProvedor);

router.post('/', verifyToken, facturaProvedorValidator.validacionesCrearFactura, facturaProvedorValidator.validadorFactura, controladorFacturaProvedor.crearFacturaProvedor);
router.get('/:id', verifyToken, controladorFacturaProvedor.obtenerFacturaPorId);
router.get('/items/:id', verifyToken, controladorFacturaProvedor.obtenerItemsFacturaPorIdFactura);

export default router;