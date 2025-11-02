import { body, param, query, validationResult } from 'express-validator';
import { ValidationError } from './errors.js';

export const validate = (validations) => {
  return async (req, res, next) => {
    await Promise.all(validations.map(validation => validation.run(req)));

    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }

    const errorMessages = errors.array().map(err => ({
      field: err.path || err.param,
      message: err.msg,
    }));

    throw new ValidationError('Validation failed', errorMessages);
  };
};

// Auth validators
export const validateRegister = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
];

export const validateLogin = [
  body('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
  body('password').notEmpty().withMessage('Password is required'),
];

// API Key validators
export const validateCreateApiKey = [
  body('name').trim().notEmpty().withMessage('API key name is required'),
  body('description').optional().isString(),
  body('rate_limit').optional().isInt({ min: 1, max: 10000 }).withMessage('Rate limit must be between 1 and 10000'),
  body('expires_at').optional().isISO8601().withMessage('Invalid expiration date format'),
];

export const validateUpdateApiKey = [
  param('id').isInt().withMessage('Invalid API key ID'),
  body('name').optional().trim().notEmpty(),
  body('description').optional().isString(),
  body('rate_limit').optional().isInt({ min: 1, max: 10000 }),
  body('is_active').optional().isBoolean(),
];

// Subscription validators
export const validateCreateSubscription = [
  body('plan_id').trim().notEmpty().withMessage('Plan ID is required'),
  body('plan_name').trim().notEmpty().withMessage('Plan name is required'),
  body('price').isFloat({ min: 0 }).withMessage('Valid price is required'),
];

// Project validators
export const validateCreateProject = [
  body('title').trim().notEmpty().withMessage('Title is required'),
  body('description').optional().isString(),
  body('budget').optional().isFloat({ min: 0 }),
];

export const validateUpdateProject = [
  param('id').isInt().withMessage('Invalid project ID'),
  body('title').optional().trim().notEmpty(),
  body('description').optional().isString(),
  body('status').optional().isIn(['pending', 'in_progress', 'completed', 'cancelled']),
  body('progress').optional().isInt({ min: 0, max: 100 }),
];

// ID validators
export const validateId = [
  param('id').isInt().withMessage('Invalid ID'),
];

// Pagination validators
export const validatePagination = [
  query('page').optional().isInt({ min: 1 }).withMessage('Page must be a positive integer'),
  query('limit').optional().isInt({ min: 1, max: 100 }).withMessage('Limit must be between 1 and 100'),
];
