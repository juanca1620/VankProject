import express from 'express';
import validadorAuth from '../middleware/validator/AuthValidator.js'
import AuthService from '../services/AuthService.js';
import AuthController from '../controllers/AuthController.js';
import RepositorioAuth from '../repositories/RepositorioAuth.js';

const repositorio = new RepositorioAuth()
const servicio = new AuthService(repositorio)
const controlador = new AuthController(servicio)

const autenticador = validadorAuth
const router = express.Router();

router.post('/login', autenticador.validacionesLogin,autenticador.validadorAuth, controlador.login);

router.post('/register',autenticador.validacionesAuth,autenticador.validadorAuth, controlador.register);

export default router;