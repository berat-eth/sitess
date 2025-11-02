import { Project } from '../models/Project.js';
import { successResponse, paginatedResponse } from '../utils/responses.js';
import { NotFoundError, AppError } from '../utils/errors.js';

export class ProjectController {
  static async list(req, res, next) {
    try {
      const userId = req.user.id;
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;

      const result = await Project.findByUserId(userId, page, limit);

      return paginatedResponse(
        res,
        { projects: result.projects },
        { page, limit, total: result.total },
        'Projects retrieved successfully'
      );
    } catch (error) {
      next(error);
    }
  }

  static async getById(req, res, next) {
    try {
      const { id } = req.params;
      const userId = req.user.id;

      const project = await Project.findById(id);
      if (!project || project.user_id !== userId) {
        throw new NotFoundError('Project');
      }

      return successResponse(res, { project }, 'Project retrieved successfully');
    } catch (error) {
      next(error);
    }
  }

  static async create(req, res, next) {
    try {
      const userId = req.user.id;
      const projectData = {
        ...req.body,
        user_id: userId,
      };

      const project = await Project.create(projectData);
      return successResponse(res, { project }, 'Project created successfully', 201);
    } catch (error) {
      next(new AppError(error.message, 400));
    }
  }

  static async update(req, res, next) {
    try {
      const { id } = req.params;
      const userId = req.user.id;

      const project = await Project.findById(id);
      if (!project || project.user_id !== userId) {
        throw new NotFoundError('Project');
      }

      const updated = await Project.update(id, req.body);
      return successResponse(res, { project: updated }, 'Project updated successfully');
    } catch (error) {
      next(error);
    }
  }

  static async delete(req, res, next) {
    try {
      const { id } = req.params;
      const userId = req.user.id;

      const project = await Project.findById(id);
      if (!project || project.user_id !== userId) {
        throw new NotFoundError('Project');
      }

      await Project.delete(id);
      return successResponse(res, null, 'Project deleted successfully');
    } catch (error) {
      next(error);
    }
  }
}
