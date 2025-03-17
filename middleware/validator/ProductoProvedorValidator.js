import { body, validationResult } from 'express-validator';

const validacionesCrearProducto = [
    body('nombre').notEmpty().withMessage("nombre obligatorio").isString().isLength({ min: 1, max: 100 }).withMessage("El nombre debe tener entre 1 y 100 caracteres"),
    body('precio').notEmpty().withMessage("precio obligatorio").isNumeric().withMessage("El precio debe ser un valor numérico"),
    body('descripcion').optional().isString().isLength({ min: 1, max: 1000 }).withMessage("La descripción debe tener entre 1 y 1000 caracteres"),
    body('cantidad_min').notEmpty().withMessage("cantidad min obligatorio").isNumeric().withMessage("La cantidad min debe ser un valor numérico"),
    body('url_imagen').notEmpty().withMessage('url obligatoria').isLength({min:1 , max: 1000}),
    body('provedor_id').notEmpty().withMessage("vendedorId obligatorio").isNumeric().withMessage("El vendedorId debe ser un valor numérico")
]

const validacionesEditarProducto = [
  body('id').notEmpty().withMessage('id obligatorio').isInt({min:1}).withMessage('El id tiene que ser un numero valido'),
  body('nombre').notEmpty().withMessage("nombre obligatorio").isString().isLength({ min: 1, max: 100 }).withMessage("El nombre debe tener entre 1 y 100 caracteres"),
  body('precio').notEmpty().withMessage("precio obligatorio").isNumeric().withMessage("El precio debe ser un valor numérico"),
  body('descripcion').optional().isString().isLength({ min: 1, max: 1000 }).withMessage("La descripción debe tener entre 1 y 1000 caracteres"),
  body('cantidad_min').notEmpty().withMessage("cantidad min obligatorio").isNumeric().withMessage("La cantidad min debe ser un valor numérico"),
  body('url_imagen').notEmpty().withMessage('url obligatoria').isLength({min:1 , max: 1000}),
]

const validadorProductoProvedor = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() })
    }
    next();
};

export default {validacionesCrearEditarProducto: validacionesCrearProducto,validadorProductoProvedor,validacionesEditarProducto}