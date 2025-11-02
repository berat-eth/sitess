import { query } from '../config/database.js';

export class User {
  static async create(userData) {
    const sql = `
      INSERT INTO users (name, email, password, role, status, company, phone)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    const params = [
      userData.name,
      userData.email,
      userData.password,
      userData.role || 'customer',
      userData.status || 'active',
      userData.company || null,
      userData.phone || null,
    ];
    const result = await query(sql, params);
    return this.findById(result.insertId);
  }

  static async findById(id) {
    const sql = 'SELECT id, name, email, role, status, company, phone, created_at, updated_at, last_login FROM users WHERE id = ?';
    const results = await query(sql, [id]);
    return results[0] || null;
  }

  static async findByEmail(email) {
    const sql = 'SELECT * FROM users WHERE email = ?';
    const results = await query(sql, [email]);
    return results[0] || null;
  }

  static async update(id, updates) {
    const allowedFields = ['name', 'email', 'password', 'role', 'status', 'company', 'phone', 'last_login'];
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
    const sql = `UPDATE users SET ${fields.join(', ')} WHERE id = ?`;
    await query(sql, values);
    return this.findById(id);
  }

  static async updateLastLogin(id) {
    const sql = 'UPDATE users SET last_login = NOW() WHERE id = ?';
    await query(sql, [id]);
  }

  static async findAll(page = 1, limit = 10) {
    const offset = (page - 1) * limit;
    const sql = `
      SELECT id, name, email, role, status, company, phone, created_at, updated_at, last_login
      FROM users
      ORDER BY created_at DESC
      LIMIT ? OFFSET ?
    `;
    const countSql = 'SELECT COUNT(*) as total FROM users';
    
    const [users, countResult] = await Promise.all([
      query(sql, [limit, offset]),
      query(countSql),
    ]);

    return {
      users,
      total: countResult[0].total,
    };
  }
}
