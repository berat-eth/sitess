import { query } from '../config/database.js';

export class Payment {
  static async create(paymentData) {
    const sql = `
      INSERT INTO payments (user_id, subscription_id, amount, currency, status, payment_method, payment_id, iyzico_conversation_id, iyzico_payment_id, transaction_date, description)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const params = [
      paymentData.user_id,
      paymentData.subscription_id || null,
      paymentData.amount,
      paymentData.currency || 'TRY',
      paymentData.status || 'pending',
      paymentData.payment_method || null,
      paymentData.payment_id || null,
      paymentData.iyzico_conversation_id || null,
      paymentData.iyzico_payment_id || null,
      paymentData.transaction_date || null,
      paymentData.description || null,
    ];
    const result = await query(sql, params);
    return this.findById(result.insertId);
  }

  static async findById(id) {
    const sql = 'SELECT * FROM payments WHERE id = ?';
    const results = await query(sql, [id]);
    return results[0] || null;
  }

  static async findByUserId(userId, page = 1, limit = 10) {
    const offset = (page - 1) * limit;
    const sql = `
      SELECT * FROM payments
      WHERE user_id = ?
      ORDER BY created_at DESC
      LIMIT ? OFFSET ?
    `;
    const countSql = 'SELECT COUNT(*) as total FROM payments WHERE user_id = ?';
    
    const [payments, countResult] = await Promise.all([
      query(sql, [userId, limit, offset]),
      query(countSql, [userId]),
    ]);

    return {
      payments,
      total: countResult[0].total,
    };
  }

  static async findByPaymentId(paymentId) {
    const sql = 'SELECT * FROM payments WHERE payment_id = ?';
    const results = await query(sql, [paymentId]);
    return results[0] || null;
  }

  static async update(id, updates) {
    const allowedFields = ['status', 'payment_method', 'payment_id', 'iyzico_conversation_id', 'iyzico_payment_id', 'transaction_date', 'description'];
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
    const sql = `UPDATE payments SET ${fields.join(', ')} WHERE id = ?`;
    await query(sql, values);
    return this.findById(id);
  }
}
