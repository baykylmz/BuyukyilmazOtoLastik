import { Request, Response, NextFunction } from 'express';
import { AppError } from '../middleware/errorHandler';
import prisma from '../lib/prisma';

// Get all services
export const getServices = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const services = await prisma.service.findMany({
      orderBy: {
        name: 'asc',
      },
    });

    res.status(200).json({
      status: 'success',
      data: services,
    });
  } catch (error) {
    next(error);
  }
};

// Get service by ID
export const getService = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    const service = await prisma.service.findUnique({
      where: { id },
    });

    if (!service) {
      throw new AppError(404, 'Service not found');
    }

    res.status(200).json({
      status: 'success',
      data: service,
    });
  } catch (error) {
    next(error);
  }
};

// Create new service
export const createService = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, description, price, durationMinutes } = req.body;

    // Check if service with same name already exists
    const existingService = await prisma.service.findFirst({
      where: { name },
    });

    if (existingService) {
      throw new AppError(409, 'Service with this name already exists');
    }

    const service = await prisma.service.create({
      data: {
        name,
        description,
        price: parseFloat(price),
        durationMinutes: parseInt(durationMinutes),
      },
    });

    res.status(201).json({
      status: 'success',
      data: service,
    });
  } catch (error) {
    next(error);
  }
};

// Update service
export const updateService = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const { name, description, price, durationMinutes } = req.body;

    // Check if service exists
    const existingService = await prisma.service.findUnique({
      where: { id },
    });

    if (!existingService) {
      throw new AppError(404, 'Service not found');
    }

    // Check if new name conflicts with other services
    if (name && name !== existingService.name) {
      const conflictingService = await prisma.service.findFirst({
        where: {
          name,
          NOT: { id },
        },
      });

      if (conflictingService) {
        throw new AppError(409, 'Service with this name already exists');
      }
    }

    const service = await prisma.service.update({
      where: { id },
      data: {
        name,
        description,
        price: price ? parseFloat(price) : undefined,
        durationMinutes: durationMinutes ? parseInt(durationMinutes) : undefined,
      },
    });

    res.status(200).json({
      status: 'success',
      data: service,
    });
  } catch (error) {
    next(error);
  }
};

// Delete service
export const deleteService = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    // Check if service exists
    const service = await prisma.service.findUnique({
      where: { id },
    });

    if (!service) {
      throw new AppError(404, 'Service not found');
    }

    // Check if service has any appointments
    const appointmentsWithService = await prisma.appointment.findFirst({
      where: { serviceId: id },
    });

    if (appointmentsWithService) {
      throw new AppError(400, 'Cannot delete service that has appointments');
    }

    await prisma.service.delete({
      where: { id },
    });

    res.status(200).json({
      status: 'success',
      message: 'Service deleted successfully',
    });
  } catch (error) {
    next(error);
  }
}; 