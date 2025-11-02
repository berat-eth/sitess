import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import config from '../config/env.js';
import { User } from '../models/User.js';

export class AuthService {
  static async hashPassword(password) {
    return await bcrypt.hash(password, 10);
  }

  static async comparePassword(password, hash) {
    return await bcrypt.compare(password, hash);
  }

  static generateToken(user) {
    const payload = {
      id: user.id,
      email: user.email,
      role: user.role,
    };

    return jwt.sign(payload, config.jwt.secret, {
      expiresIn: config.jwt.expire,
    });
  }

  static generateRefreshToken(user) {
    const payload = {
      id: user.id,
      email: user.email,
    };

    return jwt.sign(payload, config.jwt.refreshSecret, {
      expiresIn: config.jwt.refreshExpire,
    });
  }

  static verifyToken(token) {
    return jwt.verify(token, config.jwt.secret);
  }

  static verifyRefreshToken(token) {
    return jwt.verify(token, config.jwt.refreshSecret);
  }

  static async register(userData) {
    // Check if user exists
    const existingUser = await User.findByEmail(userData.email);
    if (existingUser) {
      throw new Error('User already exists with this email');
    }

    // Hash password
    const hashedPassword = await this.hashPassword(userData.password);

    // Create user
    const user = await User.create({
      ...userData,
      password: hashedPassword,
    });

    // Remove password from response
    delete user.password;

    // Generate tokens
    const token = this.generateToken(user);
    const refreshToken = this.generateRefreshToken(user);

    return {
      user,
      token,
      refreshToken,
    };
  }

  static async login(email, password) {
    // Find user
    const user = await User.findByEmail(email);
    if (!user) {
      throw new Error('Invalid email or password');
    }

    // Check password
    const isValidPassword = await this.comparePassword(password, user.password);
    if (!isValidPassword) {
      throw new Error('Invalid email or password');
    }

    // Check if user is active
    if (user.status !== 'active') {
      throw new Error('Account is not active');
    }

    // Update last login
    await User.updateLastLogin(user.id);

    // Remove password from response
    delete user.password;

    // Generate tokens
    const token = this.generateToken(user);
    const refreshToken = this.generateRefreshToken(user);

    return {
      user,
      token,
      refreshToken,
    };
  }

  static async refreshToken(refreshToken) {
    try {
      const decoded = this.verifyRefreshToken(refreshToken);
      const user = await User.findById(decoded.id);

      if (!user || user.status !== 'active') {
        throw new Error('Invalid refresh token');
      }

      // Remove password
      delete user.password;

      // Generate new tokens
      const token = this.generateToken(user);
      const newRefreshToken = this.generateRefreshToken(user);

      return {
        user,
        token,
        refreshToken: newRefreshToken,
      };
    } catch (error) {
      throw new Error('Invalid refresh token');
    }
  }
}
