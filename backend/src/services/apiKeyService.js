import crypto from 'crypto';
import bcrypt from 'bcryptjs';
import { ApiKey } from '../models/ApiKey.js';

export class ApiKeyService {
  static generateApiKey() {
    // Generate a secure random API key
    const randomBytes = crypto.randomBytes(32);
    const key = `rpk_${randomBytes.toString('hex')}`;
    const prefix = key.substring(0, 11); // rpk_ + first 7 chars
    
    return {
      key,
      prefix,
    };
  }

  static async hashApiKey(key) {
    return await bcrypt.hash(key, 10);
  }

  static async verifyApiKey(providedKey, storedHash) {
    return await bcrypt.compare(providedKey, storedHash);
  }

  static async createApiKey(userId, keyData) {
    const { key, prefix } = this.generateApiKey();
    const keyHash = await this.hashApiKey(key);

    const apiKeyData = {
      user_id: userId,
      name: keyData.name,
      description: keyData.description,
      key_hash: keyHash,
      key_prefix: prefix,
      permissions: keyData.permissions || null,
      rate_limit: keyData.rate_limit || 100,
      rate_limit_window_ms: keyData.rate_limit_window_ms || 900000,
      expires_at: keyData.expires_at || null,
    };

    const createdKey = await ApiKey.create(apiKeyData);

    // Return the key only once (plain text version)
    return {
      ...createdKey,
      key, // Include plain key only in response
      key_hash: undefined, // Don't return hash
    };
  }

  static async validateApiKey(providedKey) {
    if (!providedKey || !providedKey.startsWith('rpk_')) {
      return null;
    }

    const prefix = providedKey.substring(0, 11);
    const keys = await ApiKey.findByPrefix(prefix);

    if (keys.length === 0) {
      return null;
    }

    // Check each key with matching prefix
    for (const storedKey of keys) {
      const isValid = await this.verifyApiKey(providedKey, storedKey.key_hash);
      
      if (isValid) {
        // Check if key is active and not expired
        if (!storedKey.is_active) {
          return null;
        }

        if (await ApiKey.isExpired(storedKey)) {
          return null;
        }

        // Update last used
        await ApiKey.updateLastUsed(storedKey.id);

        return storedKey;
      }
    }

    return null;
  }

  static async revokeApiKey(apiKeyId, userId) {
    const apiKey = await ApiKey.findById(apiKeyId);
    
    if (!apiKey || apiKey.user_id !== userId) {
      throw new Error('API key not found or access denied');
    }

    await ApiKey.update(apiKeyId, { is_active: false });
    return true;
  }
}
