import express from 'express';
import verifyToken from '../middleware/segurity/TokenVerificator.js';

import RepositorioFactura from "../repositories/RepositorioFacturaVendedor.js";
import RepositorioItemFactura from "../repositories/RepositorioItemFacturaVendedor.js";
import RepositorioVendedor from "../repositories/RepositorioVendedor.js";
import RepositorioCliente from "../repositories/RepositorioCliente.js";
import RepositorioProducto from "../repositories/RepositorioProductoVendedor.js";
import RepositorioCupon from "../repositories/RepositorioCuponVendedor.js";
import RepositorioStock from "../repositories/RepositorioStock.js";

import FacturaVendedorService from "../services/FacturaVendedorService.js";
import ControladorFacturaVendedor from "../controllers/ControladorFacturaVendedor.js";
import facturaVendedorValidator from "../middleware/validator/FacturaVendedorValidator.js";

const router = express.Router();

// Crear instancias de los repositorios
const repositorioFactura = new RepositorioFactura();
const repositorioItemFactura = new RepositorioItemFactura();
const repositorioVendedor = new RepositorioVendedor();
const repositorioCliente = new RepositorioCliente();
const repositorioProducto = new RepositorioProducto();
const repositorioCupon = new RepositorioCupon();
const repositorioStock = new RepositorioStock();

// Crear instancia del servicio
const servicioFacturaVendedor = new FacturaVendedorService(
    repositorioFactura,
    repositorioItemFactura,
    repositorioVendedor,
    repositorioCliente,
    repositorioProducto,
    repositorioCupon,
    repositorioProducto,
    repositorioStock
);

// Crear instancia del controlador
const controladorFacturaVendedor = new ControladorFacturaVendedor(servicioFacturaVendedor);

// Configurar las rutas
router.post('/', verifyToken, facturaVendedorValidator.validacionesCrearFactura, facturaVendedorValidator.validadorFactura, controladorFacturaVendedor.crearFacturaVendedor);
router.get('/:id', verifyToken, controladorFacturaVendedor.obtenerFacturaPorId);
router.get('/items/:id_factura', verifyToken, controladorFacturaVendedor.obtenerItemsFacturaPorIdFactura);

export default router;