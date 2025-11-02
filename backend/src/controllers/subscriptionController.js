import { Subscription } from '../models/Subscription.js';
import { successResponse, paginatedResponse } from '../utils/responses.js';
import { NotFoundError, AppError } from '../utils/errors.js';

export class SubscriptionController {
  static async list(req, res, next) {
    try {
      const userId = req.user.id;
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;

      const result = await Subscription.findByUserId(userId, page, limit);

      return paginatedResponse(
        res,
        { subscriptions: result.subscriptions },
        { page, limit, total: result.total },
        'Subscriptions retrieved successfully'
      );
    } catch (error) {
      next(error);
    }
  }

  static async getById(req, res, next) {
    try {
      const { id } = req.params;
      const userId = req.user.id;

      const subscription = await Subscription.findById(id);
      if (!subscription || subscription.user_id !== userId) {
        throw new NotFoundError('Subscription');
      }

      return successResponse(res, { subscription }, 'Subscription retrieved successfully');
    } catch (error) {
      next(error);
    }
  }

  static async create(req, res, next) {
    try {
      const userId = req.user.id;
      const subscriptionData = {
        ...req.body,
        user_id: userId,
      };

      const subscription = await Subscription.create(subscriptionData);
      return successResponse(res, { subscription }, 'Subscription created successfully', 201);
    } catch (error) {
      next(new AppError(error.message, 400));
    }
  }

  static async update(req, res, next) {
    try {
      const { id } = req.params;
      const userId = req.user.id;

      const subscription = await Subscription.findById(id);
      if (!subscription || subscription.user_id !== userId) {
        throw new NotFoundError('Subscription');
      }

      const updated = await Subscription.update(id, req.body);
      return successResponse(res, { subscription: updated }, 'Subscription updated successfully');
    } catch (error) {
      next(error);
    }
  }
}
