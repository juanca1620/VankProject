import { body, validationResult } from 'express-validator';

const validacionesAumentarDisminuirCredito = [
    body('credito').notEmpty().withMessage('El credito es obligatorio').isInt().withMessage('Credito inválido'),
    body('id').notEmpty().withMessage('El id del vendedor es obligatorio obligatorio').isInt().withMessage('Id inválido')
]

const validadorVendedor = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() })
    }
    next();
};

export default {validadorVendedor,validacionesAumentarDisminuirCredito};