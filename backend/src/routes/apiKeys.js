import express from 'express';
import { ApiKeyController } from '../controllers/apiKeyController.js';
import { authenticateJWT } from '../middleware/auth.js';
import { validate, validateCreateApiKey, validateUpdateApiKey, validateId } from '../utils/validators.js';

const router = express.Router();

// All routes require JWT authentication
router.use(authenticateJWT);

router.get('/', ApiKeyController.list);
router.post('/', validate(validateCreateApiKey), ApiKeyController.create);
router.put('/:id', validate([...validateId, ...validateUpdateApiKey]), ApiKeyController.update);
router.delete('/:id', validate(validateId), ApiKeyController.delete);
router.post('/:id/revoke', validate(validateId), ApiKeyController.revoke);

export default router;
