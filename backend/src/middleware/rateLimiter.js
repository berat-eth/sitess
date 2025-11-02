import rateLimit from 'express-rate-limit';
import { ApiKey } from '../models/ApiKey.js';

// Default rate limiter
export const defaultRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
});

// API key based rate limiter middleware
export const apiKeyRateLimiter = async (req, res, next) => {
  if (!req.apiKey) {
    return next(); // Skip if no API key
  }

  const apiKey = req.apiKey;
  const windowMs = apiKey.rate_limit_window_ms || 900000; // Default 15 minutes
  const maxRequests = apiKey.rate_limit || 100;

  // Simple in-memory rate limiting (in production, use Redis)
  const cacheKey = `api_key_${apiKey.id}`;
  
  if (!req.app.locals.rateLimitCache) {
    req.app.locals.rateLimitCache = new Map();
  }

  const cache = req.app.locals.rateLimitCache;
  const now = Date.now();
  const cacheEntry = cache.get(cacheKey);

  if (cacheEntry) {
    // Check if window has passed
    if (now - cacheEntry.windowStart > windowMs) {
      // Reset window
      cache.set(cacheKey, {
        count: 1,
        windowStart: now,
      });
      return next();
    }

    // Check if limit exceeded
    if (cacheEntry.count >= maxRequests) {
      return res.status(429).json({
        success: false,
        message: `Rate limit exceeded. Maximum ${maxRequests} requests per ${windowMs / 1000 / 60} minutes.`,
      });
    }

    // Increment counter
    cacheEntry.count++;
  } else {
    // Create new cache entry
    cache.set(cacheKey, {
      count: 1,
      windowStart: now,
    });
  }

  next();
};
