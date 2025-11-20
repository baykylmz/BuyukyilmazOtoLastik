import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { AppError } from '../middleware/errorHandler';
import { logger } from '../utils/logger';
import prisma from '../lib/prisma';

export const authController = {
  async signup(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, email, password, role, phone, address } = req.body;

      // 1) Check if all required fields exist
      if (!name || !email || !password) {
        throw new AppError(400, 'Please provide name, email and password');
      }

      // 2) Validate input
      if (name.length < 2) {
        throw new AppError(400, 'Name must be at least 2 characters long');
      }

      if (password.length < 6) {
        throw new AppError(400, 'Password must be at least 6 characters long');
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        throw new AppError(400, 'Please provide a valid email address');
      }

      // 3) Validate role (only allow CUSTOMER for public signup, ADMIN/STAFF must be created by existing admins)
      const userRole = role === 'CUSTOMER' ? 'CUSTOMER' : 'CUSTOMER'; // Default to CUSTOMER for security

      // 4) Check if user already exists
      const existingUser = await prisma.user.findUnique({
        where: { email },
      });

      if (existingUser) {
        throw new AppError(409, 'User with this email already exists');
      }

      // 5) Hash password
      const hashedPassword = await bcrypt.hash(password, 12);

      // 6) Create user
      const newUser = await prisma.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
          role: userRole,
          phone,
          address,
        },
      });

      // 7) Generate JWT token
      const token = jwt.sign({ id: newUser.id, role: newUser.role }, process.env.JWT_SECRET!, {
        expiresIn: '1d',
      });

      // 8) Remove password from output
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password: passwordHash, ...userWithoutPassword } = newUser;

      logger.info(`New user registered: ${email} with role: ${userRole}`);

      res.status(201).json({
        status: 'success',
        data: {
          token,
          user: userWithoutPassword,
        },
        message: 'User registered successfully',
      });
    } catch (error) {
      next(error);
    }
  },

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
      const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET!, {
        expiresIn: '1d',
      });

      // Remove password from output
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
