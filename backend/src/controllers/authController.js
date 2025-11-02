import { AuthService } from '../services/authService.js';
import { successResponse } from '../utils/responses.js';
import { AppError } from '../utils/errors.js';

export class AuthController {
  static async register(req, res, next) {
    try {
      const result = await AuthService.register(req.body);
      return successResponse(res, result, 'User registered successfully', 201);
    } catch (error) {
      next(new AppError(error.message, 400));
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const result = await AuthService.login(email, password);
      return successResponse(res, result, 'Login successful');
    } catch (error) {
      next(new AppError(error.message, 401));
    }
  }

  static async refreshToken(req, res, next) {
    try {
      const { refreshToken } = req.body;
      if (!refreshToken) {
        throw new AppError('Refresh token is required', 400);
      }

      const result = await AuthService.refreshToken(refreshToken);
      return successResponse(res, result, 'Token refreshed successfully');
    } catch (error) {
      next(new AppError(error.message, 401));
    }
  }

  static async getProfile(req, res, next) {
    try {
      const user = req.user;
      delete user.password;
      return successResponse(res, { user }, 'Profile retrieved successfully');
    } catch (error) {
      next(error);
    }
  }

  static async logout(req, res, next) {
    try {
      // In a more sophisticated implementation, you might want to blacklist the token
      return successResponse(res, null, 'Logout successful');
    } catch (error) {
      next(error);
    }
  }
}
