import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AppError } from './errorHandler';
import prisma from '../lib/prisma';

// Extend Express Request type for user
interface AuthUser {
  id: string;
  role: string;
}

declare module 'express-serve-static-core' {
  interface Request {
    user?: AuthUser;
  }
}

export const authMiddleware = {
  requireAuth: async (req: Request, res: Response, next: NextFunction) => {
    try {
      // 1) Get token from header
      const authHeader = req.headers.authorization;
      if (!authHeader?.startsWith('Bearer ')) {
        throw new AppError(401, 'Please log in to access this resource');
      }

      const token = authHeader.split(' ')[1];

      // 2) Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
        id: string;
        role: string;
      };

      // 3) Check if user still exists
      const user = await prisma.user.findUnique({
        where: { id: decoded.id },
      });

      if (!user) {
        throw new AppError(401, 'User no longer exists');
      }

      // 4) Grant access to protected route
      req.user = {
        id: user.id,
        role: user.role,
      };

      next();
    } catch (error) {
      if (error instanceof jwt.JsonWebTokenError) {
        next(new AppError(401, 'Invalid token'));
      } else {
        next(error);
      }
    }
  },

  restrictTo: (...roles: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
      if (!req.user) {
        return next(new AppError(401, 'Please log in to access this resource'));
      }
      if (!roles.includes(req.user.role)) {
        return next(new AppError(403, 'You do not have permission to perform this action'));
      }
      next();
    };
  },
};
