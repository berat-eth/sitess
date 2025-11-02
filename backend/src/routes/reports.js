import express from 'express';
import { ReportController } from '../controllers/reportController.js';
import { authenticateDual } from '../middleware/apiKeyAuth.js';
import { validate, validateId, validatePagination } from '../utils/validators.js';

const router = express.Router();

// All routes support both API key and JWT authentication
router.use(authenticateDual);

router.get('/', validate(validatePagination), ReportController.list);
router.get('/:id', validate(validateId), ReportController.getById);
router.get('/:id/download', validate(validateId), ReportController.download);

export default router;
