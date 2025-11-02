import { query } from '../config/database.js';

export class Project {
  static async create(projectData) {
    const sql = `
      INSERT INTO projects (user_id, title, description, status, progress, budget, client, start_date, end_date)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const params = [
      projectData.user_id,
      projectData.title,
      projectData.description || null,
      projectData.status || 'pending',
      projectData.progress || 0,
      projectData.budget || null,
      projectData.client || null,
      projectData.start_date || null,
      projectData.end_date || null,
    ];
    const result = await query(sql, params);
    return this.findById(result.insertId);
  }

  static async findById(id) {
    const sql = 'SELECT * FROM projects WHERE id = ?';
    const results = await query(sql, [id]);
    return results[0] || null;
  }

  static async findByUserId(userId, page = 1, limit = 10) {
    const offset = (page - 1) * limit;
    const sql = `
      SELECT * FROM projects
      WHERE user_id = ?
      ORDER BY created_at DESC
      LIMIT ? OFFSET ?
    `;
    const countSql = 'SELECT COUNT(*) as total FROM projects WHERE user_id = ?';
    
    const [projects, countResult] = await Promise.all([
      query(sql, [userId, limit, offset]),
      query(countSql, [userId]),
    ]);

    return {
      projects,
      total: countResult[0].total,
    };
  }

  static async update(id, updates) {
    const allowedFields = ['title', 'description', 'status', 'progress', 'budget', 'client', 'start_date', 'end_date'];
    const fields = [];
    const values = [];

    Object.keys(updates).forEach(key => {
      if (allowedFields.includes(key)) {
        fields.push(`${key} = ?`);
        values.push(updates[key]);
      }
    });

    if (fields.length === 0) {
      return this.findById(id);
    }

    values.push(id);
    const sql = `UPDATE projects SET ${fields.join(', ')} WHERE id = ?`;
    await query(sql, values);
    return this.findById(id);
  }

  static async delete(id) {
    const sql = 'DELETE FROM projects WHERE id = ?';
    await query(sql, [id]);
    return true;
  }
}
