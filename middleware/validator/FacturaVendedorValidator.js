import { body, validationResult } from 'express-validator';

const validacionesCrearFactura = [
    body('cupon').optional().isString().isLength({max:100}).withMessage("Cupon debe ser un string entre 1 y 100 caracteres"),
    body('cliente_id').notEmpty().withMessage("clienteId obligatorio").isInt({ min: 1 }).withMessage("El clienteId debe ser un valor numérico"),
    body('vendedor_id').notEmpty().withMessage("vendedorId obligatorio").isInt({ min: 1 }).withMessage("El vendedorId debe ser un valor numérico"),
    body('items_factura').notEmpty().withMessage("itemsFactura obligatorio").isArray().withMessage("itemsFactura debe ser un array").custom((value) => {
        if (value.length > 0) {
            return true;
        } else {
            return false;
        }
    }).withMessage("itemsFactura debe tener al menos un item"),
    body('items_factura.*.cantidad_producto').notEmpty().withMessage("cantidad obligatoria").isInt({ min: 1 }).withMessage("La cantidad debe ser un valor numérico"),
    body('items_factura.*.producto_id').notEmpty().withMessage("productoId obligatorio").isInt({ min: 1 }).withMessage("El productoId debe ser un valor numérico"),
];

const validadorFactura = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    next();
};

export default { validacionesCrearFactura, validadorFactura };