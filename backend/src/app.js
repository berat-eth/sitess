import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import config from './config/env.js';
import { testConnection } from './config/database.js';
import { errorHandler } from './utils/errors.js';
import { defaultRateLimiter, apiKeyRateLimiter } from './middleware/rateLimiter.js';
import { apiLogger } from './middleware/logger.js';

// Import routes
import authRoutes from './routes/auth.js';
import apiKeyRoutes from './routes/apiKeys.js';
import subscriptionRoutes from './routes/subscriptions.js';
import projectRoutes from './routes/projects.js';
import reportRoutes from './routes/reports.js';
import paymentRoutes from './routes/payments.js';

const app = express();

// Initialize rate limit cache
app.locals.rateLimitCache = new Map();

// Trust proxy (for rate limiting and IP detection)
app.set('trust proxy', 1);

// Security middleware
app.use(helmet());

// CORS configuration
app.use(cors({
  origin: config.cors.origin,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-API-Key'],
}));

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Compression middleware
app.use(compression());

// Logging middleware
if (config.nodeEnv === 'development') {
  app.use(morgan('dev'));
} else {
  app.use(morgan('combined'));
}

// API logging middleware (applies to all routes)
app.use(apiLogger);

// Health check endpoint
app.get('/health', async (req, res) => {
  const dbStatus = await testConnection();
  res.status(dbStatus ? 200 : 503).json({
    status: dbStatus ? 'healthy' : 'unhealthy',
    timestamp: new Date().toISOString(),
    database: dbStatus ? 'connected' : 'disconnected',
  });
});

// Default rate limiter (applies to all routes)
app.use(defaultRateLimiter);

// API routes with rate limiting
app.use(`${config.api.prefix}/auth`, authRoutes);
app.use(`${config.api.prefix}/api-keys`, apiKeyRoutes);

// Routes that support both API key and JWT - add API key rate limiter
app.use(`${config.api.prefix}/subscriptions`, apiKeyRateLimiter, subscriptionRoutes);
app.use(`${config.api.prefix}/projects`, apiKeyRateLimiter, projectRoutes);
app.use(`${config.api.prefix}/reports`, apiKeyRateLimiter, reportRoutes);
app.use(`${config.api.prefix}/payments`, apiKeyRateLimiter, paymentRoutes);

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'Research Platform API',
    version: '1.0.0',
    endpoints: {
      auth: `${config.api.prefix}/auth`,
      apiKeys: `${config.api.prefix}/api-keys`,
      subscriptions: `${config.api.prefix}/subscriptions`,
      projects: `${config.api.prefix}/projects`,
      reports: `${config.api.prefix}/reports`,
      payments: `${config.api.prefix}/payments`,
    },
  });
});

// 404 handler
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: 'Endpoint not found',
    path: req.originalUrl,
  });
});

// Error handler (must be last)
app.use(errorHandler);

export default app;
