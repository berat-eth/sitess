import { query } from '../config/database.js';

export class Report {
  static async create(reportData) {
    const sql = `
      INSERT INTO reports (project_id, user_id, title, description, file_path, file_size, mime_type)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    const params = [
      reportData.project_id || null,
      reportData.user_id,
      reportData.title,
      reportData.description || null,
      reportData.file_path || null,
      reportData.file_size || null,
      reportData.mime_type || null,
    ];
    const result = await query(sql, params);
    return this.findById(result.insertId);
  }

  static async findById(id) {
    const sql = 'SELECT * FROM reports WHERE id = ?';
    const results = await query(sql, [id]);
    return results[0] || null;
  }

  static async findByUserId(userId, page = 1, limit = 10) {
    const offset = (page - 1) * limit;
    const sql = `
      SELECT * FROM reports
      WHERE user_id = ?
      ORDER BY created_at DESC
      LIMIT ? OFFSET ?
    `;
    const countSql = 'SELECT COUNT(*) as total FROM reports WHERE user_id = ?';
    
    const [reports, countResult] = await Promise.all([
      query(sql, [userId, limit, offset]),
      query(countSql, [userId]),
    ]);

    return {
      reports,
      total: countResult[0].total,
    };
  }

  static async findByProjectId(projectId) {
    const sql = 'SELECT * FROM reports WHERE project_id = ? ORDER BY created_at DESC';
    const results = await query(sql, [projectId]);
    return results;
  }

  static async incrementDownloadCount(id) {
    const sql = 'UPDATE reports SET download_count = download_count + 1 WHERE id = ?';
    await query(sql, [id]);
  }
}
