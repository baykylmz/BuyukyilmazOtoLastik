import { Request, Response, NextFunction } from 'express';
import { AppError } from '../middleware/errorHandler';
import { logger } from '../utils/logger';
import QRCode from 'qrcode';
import prisma from '../lib/prisma';
import { Prisma, Season } from '@prisma/client';

export const tireController = {
  async getAllTires(req: Request, res: Response, next: NextFunction) {
    try {
      const { brand, size, season, page = '1', limit = '10' } = req.query;
      const skip = (parseInt(page as string) - 1) * parseInt(limit as string);

      const where: Prisma.TireWhereInput = {
        ...(brand && { brand: { contains: brand as string, mode: 'insensitive' } }),
        ...(size && { size: { contains: size as string, mode: 'insensitive' } }),
        ...(season && { season: season as Season }),
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

  async getTire(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      
      const tire = await prisma.tire.findUnique({
        where: { id },
        include: {
          stockChangeLogs: {
            include: {
              user: {
                select: { name: true, email: true }
              }
            },
            orderBy: { createdAt: 'desc' },
            take: 10 // Get last 10 stock changes
          }
        }
      });

      if (!tire) {
        throw new AppError(404, 'Tire not found');
      }

      res.json({
        status: 'success',
        data: tire,
      });
    } catch (error) {
      next(error);
    }
  },

  async getTireByQrCode(req: Request, res: Response, next: NextFunction) {
    try {
      const { qrCodeId } = req.params;
      
      const tire = await prisma.tire.findUnique({
        where: { qrCodeId },
        include: {
          stockChangeLogs: {
            include: {
              user: {
                select: { name: true, email: true }
              }
            },
            orderBy: { createdAt: 'desc' },
            take: 5
          }
        }
      });

      if (!tire) {
        throw new AppError(404, 'Tire not found');
      }

      res.json({
        status: 'success',
        data: tire,
      });
    } catch (error) {
      next(error);
    }
  },

  async generateQRCode(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      
      const tire = await prisma.tire.findUnique({
        where: { id },
        select: { id: true, qrCodeId: true, name: true, brand: true }
      });

      if (!tire) {
        throw new AppError(404, 'Tire not found');
      }

      // Generate QR code data with tire info
      const qrData = JSON.stringify({
        id: tire.id,
        qrCodeId: tire.qrCodeId,
        name: tire.name,
        brand: tire.brand,
        type: 'TIRE'
      });

      // Generate base64 PNG QR code
      const qrCodeBase64 = await QRCode.toDataURL(qrData, {
        errorCorrectionLevel: 'M',
        type: 'image/png',
        quality: 0.92,
        margin: 1,
        color: {
          dark: '#000000',
          light: '#FFFFFF'
        },
        width: 256
      });

      res.json({
        status: 'success',
        data: {
          qrCode: qrCodeBase64,
          qrCodeId: tire.qrCodeId,
          tire: {
            id: tire.id,
            name: tire.name,
            brand: tire.brand
          }
        }
      });
    } catch (error) {
      next(error);
    }
  },

  async createTire(req: Request, res: Response, next: NextFunction) {
    try {
      const tireData = req.body;
      
      const tire = await prisma.tire.create({
        data: tireData,
      });

      // Log initial stock if provided
      if (tireData.stockQuantity > 0 && req.user) {
        await prisma.stockChangeLog.create({
          data: {
            tireId: tire.id,
            change: tireData.stockQuantity,
            reason: 'Initial stock',
            userId: req.user.id
          }
        });
      }

      logger.info({
        message: 'Tire created',
        tireId: tire.id,
        userId: req.user?.id,
      });

      res.status(201).json({
        status: 'success',
        data: tire,
      });
    } catch (error) {
      next(error);
    }
  },

  async updateTire(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const updateData = req.body;

      // Get current tire data for stock comparison
      const currentTire = await prisma.tire.findUnique({
        where: { id },
        select: { stockQuantity: true }
      });

      if (!currentTire) {
        throw new AppError(404, 'Tire not found');
      }

      // Use transaction to ensure consistency
      const result = await prisma.$transaction(async (tx) => {
        const updatedTire = await tx.tire.update({
          where: { id },
          data: updateData,
        });

        // Log stock change if quantity changed
        if (updateData.stockQuantity !== undefined && 
            updateData.stockQuantity !== currentTire.stockQuantity && 
            req.user) {
          const stockChange = updateData.stockQuantity - currentTire.stockQuantity;
          await tx.stockChangeLog.create({
            data: {
              tireId: id,
              change: stockChange,
              reason: 'Manual update',
              userId: req.user.id
            }
          });
        }

        return updatedTire;
      });

      logger.info({
        message: 'Tire updated',
        tireId: id,
        userId: req.user?.id,
      });

      res.json({
        status: 'success',
        data: result,
      });
    } catch (error) {
      next(error);
    }
  },

  async updateStock(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { change, reason } = req.body;

      if (!req.user) {
        throw new AppError(401, 'User authentication required');
      }

      if (typeof change !== 'number' || !reason) {
        throw new AppError(400, 'Change amount and reason are required');
      }

      // Use transaction to ensure consistency
      const result = await prisma.$transaction(async (tx) => {
        // Get current tire
        const tire = await tx.tire.findUnique({
          where: { id },
          select: { stockQuantity: true, name: true }
        });

        if (!tire) {
          throw new AppError(404, 'Tire not found');
        }

        const newStock = tire.stockQuantity + change;
        
        // Prevent negative stock
        if (newStock < 0) {
          throw new AppError(400, `Insufficient stock. Current: ${tire.stockQuantity}, Requested change: ${change}`);
        }

        // Update tire stock
        const updatedTire = await tx.tire.update({
          where: { id },
          data: { stockQuantity: newStock }
        });

        // Log the stock change
        await tx.stockChangeLog.create({
          data: {
            tireId: id,
            change,
            reason,
            userId: req.user!.id
          }
        });

        return updatedTire;
      });

      logger.info({
        message: 'Stock updated',
        tireId: id,
        change,
        reason,
        userId: req.user.id,
      });

      res.json({
        status: 'success',
        data: result,
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

      logger.info({
        message: 'Tire deleted',
        tireId: id,
        userId: req.user?.id,
      });

      res.status(204).send();
    } catch (error) {
      next(error);
    }
  },

  async getStockHistory(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { page = 1, limit = 20 } = req.query;

      const skip = (Number(page) - 1) * Number(limit);

      const [stockLogs, totalCount] = await Promise.all([
        prisma.stockChangeLog.findMany({
          where: { tireId: id },
          include: {
            user: {
              select: { name: true, email: true }
            }
          },
          orderBy: { createdAt: 'desc' },
          skip,
          take: Number(limit)
        }),
        prisma.stockChangeLog.count({
          where: { tireId: id }
        })
      ]);

      res.json({
        status: 'success',
        data: {
          logs: stockLogs,
          pagination: {
            page: Number(page),
            limit: Number(limit),
            total: totalCount,
            pages: Math.ceil(totalCount / Number(limit))
          }
        }
      });
    } catch (error) {
      next(error);
    }
  }
}; 