import { body, validationResult } from 'express-validator';

const validacionesPublicarProducto = [
    body('nombre').notEmpty().withMessage("nombre obligatorio").isString().isLength({ min: 1, max: 100 }).withMessage("El nombre debe tener entre 1 y 100 caracteres"),
    body('vendedor_id').notEmpty().withMessage("vendedorId obligatorio").isNumeric().withMessage("El vendedorId debe ser un valor numérico")
]

const validacionesActualizarPrecio = [
  body('nombre').notEmpty().withMessage("El nombre del producto es obligatorio").isString().withMessage("El nombre debe ser un string"),
  body('vendedor_id').notEmpty().withMessage("El ID del vendedor es obligatorio").isInt({ min: 1 }).withMessage("El ID del vendedor debe ser un número entero positivo"),
  body('nuevoPrecio').notEmpty().withMessage("El nuevo precio es obligatorio").isFloat({ min: 0 }).withMessage("El precio debe ser un número mayor o igual a 0"),
];

const validadorProductoProvedor = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() })
    }
    next();
};

export default {validacionesPublicarProducto, validadorProductoProvedor,validacionesActualizarPrecio}