import { ApiKeyService } from '../services/apiKeyService.js';
import { AuthenticationError } from '../utils/errors.js';
import { User } from '../models/User.js';

export const authenticateApiKey = async (req, res, next) => {
  try {
    const apiKey = req.headers['x-api-key'] || req.headers['authorization']?.replace('Bearer ', '');

    if (!apiKey) {
      throw new AuthenticationError('API key is required');
    }

    const validatedKey = await ApiKeyService.validateApiKey(apiKey);

    if (!validatedKey) {
      throw new AuthenticationError('Invalid or expired API key');
    }

    // Get user associated with API key
    const user = await User.findById(validatedKey.user_id);
    
    if (!user || user.status !== 'active') {
      throw new AuthenticationError('User account is inactive');
    }

    req.apiKey = validatedKey;
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

// Dual authentication: Try API key first, then JWT
export const authenticateDual = async (req, res, next) => {
  try {
    // Try API key first
    const apiKey = req.headers['x-api-key'] || req.headers['authorization']?.replace('Bearer ', '');

    if (apiKey && apiKey.startsWith('rpk_')) {
      return authenticateApiKey(req, res, next);
    }

    // Fall back to JWT
    const { authenticateJWT } = await import('./auth.js');
    return authenticateJWT(req, res, next);
  } catch (error) {
    next(error);
  }
};
