import { Payment } from '../models/Payment.js';
import { successResponse, paginatedResponse } from '../utils/responses.js';
import { NotFoundError } from '../utils/errors.js';

export class PaymentController {
  static async list(req, res, next) {
    try {
      const userId = req.user.id;
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;

      const result = await Payment.findByUserId(userId, page, limit);

      return paginatedResponse(
        res,
        { payments: result.payments },
        { page, limit, total: result.total },
        'Payments retrieved successfully'
      );
    } catch (error) {
      next(error);
    }
  }

  static async getById(req, res, next) {
    try {
      const { id } = req.params;
      const userId = req.user.id;

      const payment = await Payment.findById(id);
      if (!payment || payment.user_id !== userId) {
        throw new NotFoundError('Payment');
      }

      return successResponse(res, { payment }, 'Payment retrieved successfully');
    } catch (error) {
      next(error);
    }
  }
}
