import express from 'express';
import validadorAuth from '../middleware/validator/AuthValidator.js'
import AuthController from '../controllers/AuthController.js';


const router = express.Router();

export default router;