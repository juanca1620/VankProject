import express from 'express';

import RepositorioProductoVendedor from "../repositories/RepositorioProductoVendedor.js";
import RepositorioStock from "../repositories/RepositorioStock.js"
import ProductoVendedorService from "../services/ProductoVendedorService.js";
import ControladorProductoVendedor from "../controllers/ControladorProductoVendedor.js";
import verifyToken from '../middleware/segurity/TokenVerificator.js';
import valicacionesProductoVendedor from "../middleware/validator/ProductoVendedorValidator.js";

const router = express.Router();

const repositorioProductoVendedor = new RepositorioProductoVendedor();
const repositorioStock = new RepositorioStock();
const productoVendedorService = new ProductoVendedorService(repositorioProductoVendedor, repositorioStock);
const controladorProductoVendedor = new ControladorProductoVendedor(productoVendedorService);

router.post('/publicar', verifyToken, valicacionesProductoVendedor.validacionesPublicarProducto, valicacionesProductoVendedor.validadorProductoProvedor, controladorProductoVendedor.publicarProducto);
router.post('/despublicar', verifyToken, valicacionesProductoVendedor.validacionesPublicarProducto, valicacionesProductoVendedor.validadorProductoProvedor, controladorProductoVendedor.despublicarProducto);
router.put('/actualizarPrecio', verifyToken, valicacionesProductoVendedor.validacionesActualizarPrecio, valicacionesProductoVendedor.validadorProductoProvedor, controladorProductoVendedor.actualizarPrecioProducto);

export default router;

