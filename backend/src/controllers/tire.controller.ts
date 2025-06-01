import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';
import { AppError } from '../middleware/errorHandler';
import { logger } from '../utils/logger';

const prisma = new PrismaClient();

export const tireController = {
  async getAllTires(req: Request, res: Response, next: NextFunction) {
    try {
      const { brand, size, season, page = '1', limit = '10' } = req.query;
      const skip = (parseInt(page as string) - 1) * parseInt(limit as string);

      const where = {
        ...(brand && { brand: { equals: brand as string, mode: 'insensitive' } }),
        ...(size && { size: { equals: size as string, mode: 'insensitive' } }),
        ...(season && { season: season as string }),
      };

      const [tires, total] = await Promise.all([
        prisma.tire.findMany({
          where,
          skip,
          take: parseInt(limit as string),
          orderBy: { createdAt: 'desc' },
        }),
        prisma.tire.count({ where }),
      ]);

      res.json({
        status: 'success',
        data: {
          tires,
          pagination: {
            total,
            page: parseInt(page as string),
            limit: parseInt(limit as string),
            pages: Math.ceil(total / parseInt(limit as string)),
          },
        },
      });
    } catch (error) {
      next(error);
    }
  },

  async getTireById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const tire = await prisma.tire.findUnique({
        where: { id },
      });

      if (!tire) {
        throw new AppError(404, 'Tire not found');
      }

      res.json({
        status: 'success',
        data: { tire },
      });
    } catch (error) {
      next(error);
    }
  },

  async createTire(req: Request, res: Response, next: NextFunction) {
    try {
      const tire = await prisma.tire.create({
        data: req.body,
      });

      logger.info(`New tire created: ${tire.id}`);
      res.status(201).json({
        status: 'success',
        data: { tire },
      });
    } catch (error) {
      next(error);
    }
  },

  async updateTire(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const tire = await prisma.tire.update({
        where: { id },
        data: req.body,
      });

      logger.info(`Tire updated: ${tire.id}`);
      res.json({
        status: 'success',
        data: { tire },
      });
    } catch (error) {
      next(error);
    }
  },

  async deleteTire(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      await prisma.tire.delete({
        where: { id },
      });

      logger.info(`Tire deleted: ${id}`);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  },
}; 