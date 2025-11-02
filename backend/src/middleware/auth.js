import jwt from 'jsonwebtoken';
import config from '../config/env.js';
import { User } from '../models/User.js';
import { AuthenticationError, AuthorizationError } from '../utils/errors.js';

// JWT Authentication middleware
export const authenticateJWT = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new AuthenticationError('No token provided');
    }

    const token = authHeader.substring(7);
    const decoded = jwt.verify(token, config.jwt.secret);

    const user = await User.findById(decoded.id);
    if (!user || user.status !== 'active') {
      throw new AuthenticationError('User not found or inactive');
    }

    req.user = user;
    next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      next(new AuthenticationError('Invalid token'));
    } else {
      next(error);
    }
  }
};

// Optional JWT authentication (doesn't fail if no token)
export const optionalJWT = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.substring(7);
      const decoded = jwt.verify(token, config.jwt.secret);
      const user = await User.findById(decoded.id);
      
      if (user && user.status === 'active') {
        req.user = user;
      }
    }
    next();
  } catch (error) {
    // Silently fail and continue without user
    next();
  }
};

// Role-based authorization
export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      throw new AuthenticationError('Authentication required');
    }

    if (!roles.includes(req.user.role)) {
      throw new AuthorizationError('Insufficient permissions');
    }

    next();
  };
};
