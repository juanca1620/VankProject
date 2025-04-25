import express from 'express';
import Validator from '../middleware/validator/VendendorValidator.js';
import VendedorController from '../controllers/ControladorVendedor.js'
import VendedorService from '../services/VendedorService.js'
import RepositorioVendedor from '../repositories/RepositorioVendedor.js'
import tokenVeficator from '../middleware/segurity/TokenVerificator.js'

const router = express.Router();

router.post("/reporte/:vendedorId", (req, res) =>{
    const vendedorID = req.params.vendedorId;
    res.send(`Reporte del vendedor ${vendedorID}`);
})

const repositorioVendedor = new RepositorioVendedor();
const servicioVendedor = new VendedorService(repositorioVendedor);
const controladorVendedor = new VendedorController(servicioVendedor);

router.put("/aumentarCredito/:vendedorId",Validator.validacionesAumentarDisminuirCredito , Validator.validadorVendedor , tokenVeficator, controladorVendedor.cambiarBalance);

export default router;