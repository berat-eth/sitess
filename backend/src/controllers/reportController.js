import { Report } from '../models/Report.js';
import { successResponse, paginatedResponse } from '../utils/responses.js';
import { NotFoundError } from '../utils/errors.js';
import fs from 'fs';
import path from 'path';

export class ReportController {
  static async list(req, res, next) {
    try {
      const userId = req.user.id;
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;

      const result = await Report.findByUserId(userId, page, limit);

      return paginatedResponse(
        res,
        { reports: result.reports },
        { page, limit, total: result.total },
        'Reports retrieved successfully'
      );
    } catch (error) {
      next(error);
    }
  }

  static async getById(req, res, next) {
    try {
      const { id } = req.params;
      const userId = req.user.id;

      const report = await Report.findById(id);
      if (!report || report.user_id !== userId) {
        throw new NotFoundError('Report');
      }

      return successResponse(res, { report }, 'Report retrieved successfully');
    } catch (error) {
      next(error);
    }
  }

  static async download(req, res, next) {
    try {
      const { id } = req.params;
      const userId = req.user.id;

      const report = await Report.findById(id);
      if (!report || report.user_id !== userId) {
        throw new NotFoundError('Report');
      }

      if (!report.file_path) {
        return res.status(404).json({
          success: false,
          message: 'Report file not found',
        });
      }

      // Increment download count
      await Report.incrementDownloadCount(id);

      // Check if file exists
      const filePath = path.resolve(report.file_path);
      if (!fs.existsSync(filePath)) {
        return res.status(404).json({
          success: false,
          message: 'Report file not found on server',
        });
      }

      // Set headers and send file
      res.setHeader('Content-Type', report.mime_type || 'application/pdf');
      res.setHeader('Content-Disposition', `attachment; filename="${report.title}.pdf"`);
      
      return res.sendFile(filePath);
    } catch (error) {
      next(error);
    }
  }
}
