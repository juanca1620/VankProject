import express from 'express';
import verifyToken from '../middleware/segurity/tokenVerificator.js'
import facturaProvedorValidator from '../middleware/validator/facturaProvedorValidator.js';


const router = express.Router();

router.post('/', verifyToken, facturaProvedorValidator.validacionesCrearFactura, facturaProvedorValidator.validadorFactura, (req, res) => {
    res.send('Factura creada');
});

export default router;