import express from 'express';
import { AuthController } from '../controllers/authController.js';
import { authenticateJWT } from '../middleware/auth.js';
import { validate, validateRegister, validateLogin } from '../utils/validators.js';

const router = express.Router();

router.post('/register', validate(validateRegister), AuthController.register);
router.post('/login', validate(validateLogin), AuthController.login);
router.post('/refresh', AuthController.refreshToken);
router.post('/logout', authenticateJWT, AuthController.logout);
router.get('/profile', authenticateJWT, AuthController.getProfile);

export default router;
