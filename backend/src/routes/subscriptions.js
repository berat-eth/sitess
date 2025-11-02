import express from 'express';
import { SubscriptionController } from '../controllers/subscriptionController.js';
import { authenticateDual } from '../middleware/apiKeyAuth.js';
import { validate, validateCreateSubscription, validateId, validatePagination } from '../utils/validators.js';

const router = express.Router();

// All routes support both API key and JWT authentication
router.use(authenticateDual);

router.get('/', validate(validatePagination), SubscriptionController.list);
router.get('/:id', validate(validateId), SubscriptionController.getById);
router.post('/', validate(validateCreateSubscription), SubscriptionController.create);
router.put('/:id', validate([...validateId, ...validateCreateSubscription]), SubscriptionController.update);

export default router;
