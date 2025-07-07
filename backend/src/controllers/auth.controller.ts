import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { AppError } from '../middleware/errorHandler';
import { logger } from '../utils/logger';
import prisma from '../lib/prisma';

export const authController = {
  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;

      // 1) Check if email and password exist
      if (!email || !password) {
        throw new AppError(400, 'Please provide email and password');
      }

      // 2) Check if user exists && password is correct
      const user = await prisma.user.findUnique({
        where: { email },
      });

      if (!user || !(await bcrypt.compare(password, user.password))) {
        throw new AppError(401, 'Incorrect email or password');
      }

      // 3) If everything ok, send token to client
      const token = jwt.sign(
        { id: user.id, role: user.role },
        process.env.JWT_SECRET!,
        {
          expiresIn: '1d',
        }
      );

      // Remove password from output
      const { password: _, ...userWithoutPassword } = user;

      res.json({
        status: 'success',
        data: {
          token,
          user: userWithoutPassword,
        },
      });
    } catch (error) {
      next(error);
    }
  },
}; 