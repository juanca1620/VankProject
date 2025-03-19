import { body, validationResult } from 'express-validator';

const validacionesCrearItemFactura = [
    body('cantidad_producto').notEmpty().withMessage("cantidad obligatoria").isInt({min:1}).withMessage("La cantidad debe ser un valor numérico"),
    body('producto_id').notEmpty().withMessage("productoId obligatorio").isInt({min:1}).withMessage("El productoId debe ser un valor numérico"),
    body('factura_id').notEmpty().withMessage("facturaId obligatorio").isInt({min:1}).withMessage("El facturaId debe ser un valor numérico")
]

const validadorItemFactura = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() })
    }
    next();
};

export default {validadorItemFactura,validacionesCrearItemFactura};

