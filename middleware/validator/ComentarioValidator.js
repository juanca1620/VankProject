import { body, validationResult } from 'express-validator';

const validacionesCrearComentario = [
    body('contenido')
        .notEmpty().withMessage("El contenido es obligatorio")
        .isString().withMessage("El contenido debe ser un texto")
        .isLength({ min: 1, max: 1000 }).withMessage("El contenido debe tener entre 1 y 1000 caracteres"),
    body('cliente_id')
        .notEmpty().withMessage("El cliente_id es obligatorio")
        .isNumeric().withMessage("El cliente_id debe ser un valor numérico"),
    body('producto_id')
        .notEmpty().withMessage("El producto_id es obligatorio")
        .isNumeric().withMessage("El producto_id debe ser un valor numérico")
];

// Middleware para validar los datos
const validadorComentario = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    next();
};

export default { validacionesCrearComentario, validadorComentario };