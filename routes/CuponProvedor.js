import express from 'express';
import verifyToken from '../middleware/segurity/TokenVerificator.js';
import RepositorioCupon from '../repositories/RepositorioCuponProvedor.js';
import RepositorioProveedor from '../repositories/RepositorioProveedor.js';
import CuponService from '../services/CuponProvedorService.js';
import ControladorCupon from '../controllers/ControladorCuponProvedor.js';
import CuponValidator from "../middleware/validator/CuponProvedor.js"

const router = express.Router();

const repositorioCupon = new RepositorioCupon();
const repositorioProveedor = new RepositorioProveedor();
const cuponService = new CuponService(repositorioCupon,repositorioProveedor);
const controladorCupon = new ControladorCupon(cuponService);

router.get('/:nombre/:proveedor_id', verifyToken, controladorCupon.buscarCuponPorNombreYProveedor);
router.get('/:nombre', verifyToken, controladorCupon.buscarCuponPorNombre);
router.post('/', verifyToken,CuponValidator.validacionesCrearCupon,CuponValidator.validadorCuponProvedor, controladorCupon.crearCupon);
router.delete('/:nombre/:proveedor_id', verifyToken, controladorCupon.eliminarCuponPorNombreYProveedor);

export default router;