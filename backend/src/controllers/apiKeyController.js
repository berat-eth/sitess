import { ApiKeyService } from '../services/apiKeyService.js';
import { ApiKey } from '../models/ApiKey.js';
import { successResponse, paginatedResponse } from '../utils/responses.js';
import { NotFoundError, AppError } from '../utils/errors.js';

export class ApiKeyController {
  static async list(req, res, next) {
    try {
      const userId = req.user.id;
      const keys = await ApiKey.findByUserId(userId);
      
      // Remove sensitive data
      const sanitizedKeys = keys.map(key => ({
        id: key.id,
        name: key.name,
        description: key.description,
        key_prefix: key.key_prefix,
        rate_limit: key.rate_limit,
        is_active: key.is_active,
        expires_at: key.expires_at,
        last_used_at: key.last_used_at,
        created_at: key.created_at,
        updated_at: key.updated_at,
      }));

      return successResponse(res, { apiKeys: sanitizedKeys }, 'API keys retrieved successfully');
    } catch (error) {
      next(error);
    }
  }

  static async create(req, res, next) {
    try {
      const userId = req.user.id;
      const result = await ApiKeyService.createApiKey(userId, req.body);
      
      return successResponse(res, result, 'API key created successfully. Save this key securely - it will not be shown again.', 201);
    } catch (error) {
      next(new AppError(error.message, 400));
    }
  }

  static async update(req, res, next) {
    try {
      const { id } = req.params;
      const userId = req.user.id;

      const apiKey = await ApiKey.findById(id);
      if (!apiKey || apiKey.user_id !== userId) {
        throw new NotFoundError('API key');
      }

      const updated = await ApiKey.update(id, req.body);
      delete updated.key_hash;

      return successResponse(res, updated, 'API key updated successfully');
    } catch (error) {
      next(error);
    }
  }

  static async delete(req, res, next) {
    try {
      const { id } = req.params;
      const userId = req.user.id;

      const apiKey = await ApiKey.findById(id);
      if (!apiKey || apiKey.user_id !== userId) {
        throw new NotFoundError('API key');
      }

      await ApiKey.delete(id);
      return successResponse(res, null, 'API key deleted successfully');
    } catch (error) {
      next(error);
    }
  }

  static async revoke(req, res, next) {
    try {
      const { id } = req.params;
      const userId = req.user.id;

      await ApiKeyService.revokeApiKey(id, userId);
      return successResponse(res, null, 'API key revoked successfully');
    } catch (error) {
      next(new AppError(error.message, 400));
    }
  }
}
