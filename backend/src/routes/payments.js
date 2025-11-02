import express from 'express';
import { PaymentController } from '../controllers/paymentController.js';
import { authenticateDual } from '../middleware/apiKeyAuth.js';
import { validate, validateId, validatePagination } from '../utils/validators.js';

const router = express.Router();

// All routes support both API key and JWT authentication
router.use(authenticateDual);

router.get('/', validate(validatePagination), PaymentController.list);
router.get('/:id', validate(validateId), PaymentController.getById);

export default router;
