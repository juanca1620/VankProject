import { body, validationResult } from 'express-validator';

const validacionesAuth = [
    body('nombre').notEmpty().withMessage('El nombre es obligatorio').isLength({ min: 3, max: 150 }).withMessage('Nombre inválido, tiene que ser entre 3 y 150 caracteres'),
    body('email').notEmpty().withMessage('El email es obligatorio').isEmail().withMessage('Email inválido'),
    body('telefono').notEmpty().withMessage('El telefono es obligatorio').isInt().isLength({ min: 10, max: 10 }).withMessage('Telefono inválido'),
    body('contrasenna').notEmpty().withMessage('La contrasenna es obligatoria').isLength({ min: 8,max:72 }).withMessage('Contraseña inválida, tiene que ser entre 8 y 72 caracteres'),
    body('rol').notEmpty().withMessage('El rol es obligatorio').custom((value) => {
        if(value === 'cliente' || value === 'vendedor' || value === 'provedor'){
            return true;
        }else{
            return false;
        }
    }).withMessage('Rol inválido') 
];

const validacionesLogin = [
    body('email').notEmpty().withMessage('El email es obligatorio').isEmail().withMessage('Email inválido'),
    body('contrasenna').notEmpty().withMessage('La contrasenna es obligatoria').isLength({ min: 8,max:72 }).withMessage('Contraseña inválida, tiene que ser entre 8 y 72 caracteres'),
]

const validadorAuth = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() })
    }
    next();
};

export default {validadorAuth,validacionesAuth,validacionesLogin};
