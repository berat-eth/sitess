import express from 'express';
import { ProjectController } from '../controllers/projectController.js';
import { authenticateDual } from '../middleware/apiKeyAuth.js';
import { validate, validateCreateProject, validateUpdateProject, validateId, validatePagination } from '../utils/validators.js';

const router = express.Router();

// All routes support both API key and JWT authentication
router.use(authenticateDual);

router.get('/', validate(validatePagination), ProjectController.list);
router.get('/:id', validate(validateId), ProjectController.getById);
router.post('/', validate(validateCreateProject), ProjectController.create);
router.put('/:id', validate([...validateId, ...validateUpdateProject]), ProjectController.update);
router.delete('/:id', validate(validateId), ProjectController.delete);

export default router;
