import express from 'express';
import verifyToken from '../middleware/segurity/TokenVerificator.js';
import RepositorioCupon from '../repositories/RepositorioCuponVendedor.js';
import RepositorioVendedor from '../repositories/RepositorioVendedor.js';
import CuponService from '../services/CuponVendedorService.js';
import ControladorCupon from '../controllers/ControladorCuponVendedor.js';
import CuponValidator from "../middleware/validator/CuponVendedor.js"

const router = express.Router();

const repositorioCupon = new RepositorioCupon();
const repositorioProveedor = new RepositorioVendedor();
const cuponService = new CuponService(repositorioCupon,repositorioProveedor);
const controladorCupon = new ControladorCupon(cuponService);

router.get('/:nombre/:vendedor_id', verifyToken, controladorCupon.buscarCuponPorNombreYVendedor);
router.get('/:nombre', verifyToken, controladorCupon.buscarCuponPorNombre);
router.post('/', verifyToken,CuponValidator.validacionesCrearCupon,CuponValidator.validadorCuponVendedor, controladorCupon.crearCupon);
router.delete('/:nombre/:vendedor_id', verifyToken, controladorCupon.eliminarCuponPorNombreYVendedor);

export default router;