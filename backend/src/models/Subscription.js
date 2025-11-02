import { query } from '../config/database.js';

export class Subscription {
  static async create(subscriptionData) {
    const sql = `
      INSERT INTO subscriptions (user_id, plan_id, plan_name, price, currency, status, start_date, end_date, payment_id, payment_status, iyzico_conversation_id)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const params = [
      subscriptionData.user_id,
      subscriptionData.plan_id,
      subscriptionData.plan_name,
      subscriptionData.price,
      subscriptionData.currency || 'TRY',
      subscriptionData.status || 'inactive',
      subscriptionData.start_date || null,
      subscriptionData.end_date || null,
      subscriptionData.payment_id || null,
      subscriptionData.payment_status || null,
      subscriptionData.iyzico_conversation_id || null,
    ];
    const result = await query(sql, params);
    return this.findById(result.insertId);
  }

  static async findById(id) {
    const sql = 'SELECT * FROM subscriptions WHERE id = ?';
    const results = await query(sql, [id]);
    return results[0] || null;
  }

  static async findByUserId(userId, page = 1, limit = 10) {
    const offset = (page - 1) * limit;
    const sql = `
      SELECT * FROM subscriptions
      WHERE user_id = ?
      ORDER BY created_at DESC
      LIMIT ? OFFSET ?
    `;
    const countSql = 'SELECT COUNT(*) as total FROM subscriptions WHERE user_id = ?';
    
    const [subscriptions, countResult] = await Promise.all([
      query(sql, [userId, limit, offset]),
      query(countSql, [userId]),
    ]);

    return {
      subscriptions,
      total: countResult[0].total,
    };
  }

  static async findByPaymentId(paymentId) {
    const sql = 'SELECT * FROM subscriptions WHERE payment_id = ?';
    const results = await query(sql, [paymentId]);
    return results[0] || null;
  }

  static async update(id, updates) {
    const allowedFields = ['plan_id', 'plan_name', 'price', 'status', 'start_date', 'end_date', 'payment_id', 'payment_status', 'iyzico_conversation_id'];
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
    const sql = `UPDATE subscriptions SET ${fields.join(', ')} WHERE id = ?`;
    await query(sql, values);
    return this.findById(id);
  }
}
