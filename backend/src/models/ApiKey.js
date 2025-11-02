import { query } from '../config/database.js';

export class ApiKey {
  static async create(keyData) {
    const sql = `
      INSERT INTO api_keys (user_id, name, description, key_hash, key_prefix, permissions, rate_limit, rate_limit_window_ms, expires_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const params = [
      keyData.user_id,
      keyData.name,
      keyData.description || null,
      keyData.key_hash,
      keyData.key_prefix,
      keyData.permissions ? JSON.stringify(keyData.permissions) : null,
      keyData.rate_limit || 100,
      keyData.rate_limit_window_ms || 900000,
      keyData.expires_at || null,
    ];
    const result = await query(sql, params);
    return this.findById(result.insertId);
  }

  static async findById(id) {
    const sql = 'SELECT * FROM api_keys WHERE id = ?';
    const results = await query(sql, [id]);
    if (results[0]) {
      results[0].permissions = results[0].permissions ? JSON.parse(results[0].permissions) : null;
    }
    return results[0] || null;
  }

  static async findByHash(keyHash) {
    const sql = 'SELECT * FROM api_keys WHERE key_hash = ? AND is_active = TRUE';
    const results = await query(sql, [keyHash]);
    if (results[0]) {
      results[0].permissions = results[0].permissions ? JSON.parse(results[0].permissions) : null;
    }
    return results[0] || null;
  }

  static async findByPrefix(prefix) {
    const sql = 'SELECT * FROM api_keys WHERE key_prefix = ?';
    const results = await query(sql, [prefix]);
    return results.map(key => ({
      ...key,
      permissions: key.permissions ? JSON.parse(key.permissions) : null,
    }));
  }

  static async findByUserId(userId) {
    const sql = 'SELECT id, name, description, key_prefix, rate_limit, is_active, expires_at, last_used_at, created_at, updated_at FROM api_keys WHERE user_id = ? ORDER BY created_at DESC';
    const results = await query(sql, [userId]);
    return results;
  }

  static async update(id, updates) {
    const allowedFields = ['name', 'description', 'permissions', 'rate_limit', 'rate_limit_window_ms', 'is_active', 'expires_at'];
    const fields = [];
    const values = [];

    Object.keys(updates).forEach(key => {
      if (allowedFields.includes(key)) {
        if (key === 'permissions') {
          fields.push(`${key} = ?`);
          values.push(JSON.stringify(updates[key]));
        } else {
          fields.push(`${key} = ?`);
          values.push(updates[key]);
        }
      }
    });

    if (fields.length === 0) {
      return this.findById(id);
    }

    values.push(id);
    const sql = `UPDATE api_keys SET ${fields.join(', ')} WHERE id = ?`;
    await query(sql, values);
    return this.findById(id);
  }

  static async updateLastUsed(id) {
    const sql = 'UPDATE api_keys SET last_used_at = NOW() WHERE id = ?';
    await query(sql, [id]);
  }

  static async delete(id) {
    const sql = 'DELETE FROM api_keys WHERE id = ?';
    await query(sql, [id]);
    return true;
  }

  static async isExpired(key) {
    if (!key.expires_at) return false;
    return new Date(key.expires_at) < new Date();
  }
}
