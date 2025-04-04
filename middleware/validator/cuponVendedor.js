import { body, validationResult } from 'express-validator';

const validacionesCrearCupon = [
    body("descuento_porcentaje").notEmpty().withMessage("Descuento obligatorio").isFloat({ min: 0, max: 100 }).withMessage("El descuento debe ser un valor entre 0 y 100"),
    body("vendedor_id").notEmpty().withMessage("vendedorId obligatorio").isInt({ min: 1 }).withMessage("El proveedorId debe ser un valor numérico"),
    body("nombre").notEmpty().withMessage("nombre obligatorio").isString().isLength({ max: 100 }).withMessage("El nombre debe ser un string de 1 a 100 caracteres")
]

const validadorCuponVendedor = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    next();
};

export default { validacionesCrearCupon, validadorCuponVendedor };