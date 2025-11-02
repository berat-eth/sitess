import { query } from '../config/database.js';

export const apiLogger = async (req, res, next) => {
  const startTime = Date.now();

  // Override res.json to capture response
  const originalJson = res.json.bind(res);
  res.json = function (body) {
    res.responseBody = body;
    return originalJson(body);
  };

  res.on('finish', async () => {
    const responseTime = Date.now() - startTime;
    const logData = {
      api_key_id: req.apiKey?.id || null,
      user_id: req.user?.id || null,
      endpoint: req.originalUrl || req.url,
      method: req.method,
      status_code: res.statusCode,
      response_time_ms: responseTime,
      ip_address: req.ip || req.connection.remoteAddress,
      user_agent: req.get('user-agent') || null,
      request_body: req.method !== 'GET' ? JSON.stringify(req.body) : null,
    };

    try {
      await query(
        `INSERT INTO api_logs (api_key_id, user_id, endpoint, method, status_code, response_time_ms, ip_address, user_agent, request_body)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          logData.api_key_id,
          logData.user_id,
          logData.endpoint,
          logData.method,
          logData.status_code,
          logData.response_time_ms,
          logData.ip_address,
          logData.user_agent,
          logData.request_body,
        ]
      );
    } catch (error) {
      console.error('Error logging API request:', error);
      // Don't throw - logging shouldn't break the request
    }
  });

  next();
};
