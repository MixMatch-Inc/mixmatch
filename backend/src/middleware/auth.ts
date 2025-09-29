import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AuthRequest, ErrorResponse, JwtPayload } from '../types';
import { getUserById } from '../data/userStore';

export const authenticateToken = (req: AuthRequest, res: Response<ErrorResponse>, next: NextFunction): void => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.startsWith('Bearer ') ? authHeader.substring(7) : null;

  if (!token) {
    res.status(401).json({
      message: 'Access token is required',
      status: 401,
      success: false
    });
    return;
  }

  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret) {
    res.status(500).json({
      message: 'JWT secret not configured',
      status: 500,
      success: false
    });
    return;
  }

  try {
    const decoded = jwt.verify(token, jwtSecret) as JwtPayload;

    // Get user data from our store
    const user = getUserById(decoded.userId);
    if (!user) {
      res.status(401).json({
        message: 'User not found',
        status: 401,
        success: false
      });
      return;
    }

    // Attach user information to request object
    req.user = user;
    next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      res.status(401).json({
        message: 'Invalid token',
        status: 401,
        success: false
      });
    } else if (error instanceof jwt.TokenExpiredError) {
      res.status(401).json({
        message: 'Token expired',
        status: 401,
        success: false
      });
    } else {
      res.status(401).json({
        message: 'Token verification failed',
        status: 401,
        success: false
      });
    }
    return;
  }
};
