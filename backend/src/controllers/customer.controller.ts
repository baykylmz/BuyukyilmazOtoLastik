import { Request, Response, NextFunction } from 'express';
import { AppError } from '../middleware/errorHandler';
import prisma from '../lib/prisma';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

export const getCustomers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const customers = await prisma.customer.findMany({
      include: {
        vehicles: true,
      },
    });
    res.json({
      status: 'success',
      data: { customers },
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      next(new AppError(500, 'Database error occurred'));
    } else {
      next(error);
    }
  }
};

export const getCustomer = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const customer = await prisma.customer.findUnique({
      where: { id },
      include: {
        vehicles: true,
      },
    });

    if (!customer) {
      throw new AppError(404, 'Customer not found');
    }

    res.json({
      status: 'success',
      data: { customer },
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      next(new AppError(500, 'Database error occurred'));
    } else {
      next(error);
    }
  }
};

export const createCustomer = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, email, phone, address } = req.body.body;

    const existingCustomer = await prisma.customer.findUnique({
      where: { email },
    });

    if (existingCustomer) {
      throw new AppError(400, 'Email already registered');
    }

    const customer = await prisma.customer.create({
      data: {
        name,
        email,
        phone,
        address,
      },
    });

    res.status(201).json({
      status: 'success',
      data: { customer },
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        next(new AppError(400, 'Email already registered'));
      } else {
        next(new AppError(500, 'Database error occurred'));
      }
    } else {
      next(error);
    }
  }
};

export const updateCustomer = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const { name, email, phone, address } = req.body.body;

    const existingCustomer = await prisma.customer.findUnique({
      where: { id },
    });

    if (!existingCustomer) {
      throw new AppError(404, 'Customer not found');
    }

    if (email !== existingCustomer.email) {
      const emailExists = await prisma.customer.findUnique({
        where: { email },
      });

      if (emailExists) {
        throw new AppError(400, 'Email already registered');
      }
    }

    const customer = await prisma.customer.update({
      where: { id },
      data: {
        name,
        email,
        phone,
        address,
      },
    });

    res.json({
      status: 'success',
      data: { customer },
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        next(new AppError(400, 'Email already registered'));
      } else {
        next(new AppError(500, 'Database error occurred'));
      }
    } else {
      next(error);
    }
  }
};

export const deleteCustomer = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    const customer = await prisma.customer.findUnique({
      where: { id },
    });

    if (!customer) {
      throw new AppError(404, 'Customer not found');
    }

    await prisma.customer.delete({
      where: { id },
    });

    res.status(204).send();
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      next(new AppError(500, 'Database error occurred'));
    } else {
      next(error);
    }
  }
};

export const addVehicle = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { customerId } = req.params;
    const { make, model, year, licensePlate } = req.body.body;

    const customer = await prisma.customer.findUnique({
      where: { id: customerId },
    });

    if (!customer) {
      throw new AppError(404, 'Customer not found');
    }

    const existingVehicle = await prisma.vehicle.findUnique({
      where: { licensePlate },
    });

    if (existingVehicle) {
      throw new AppError(400, 'License plate already registered');
    }

    const vehicle = await prisma.vehicle.create({
      data: {
        make,
        model,
        year,
        licensePlate,
        customerId,
      },
    });

    res.status(201).json({
      status: 'success',
      data: { vehicle },
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        next(new AppError(400, 'License plate already registered'));
      } else {
        next(new AppError(500, 'Database error occurred'));
      }
    } else {
      next(error);
    }
  }
};

export const updateVehicle = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { customerId, vehicleId } = req.params;
    const { make, model, year, licensePlate } = req.body;

    const vehicle = await prisma.vehicle.findUnique({
      where: { id: vehicleId },
    });

    if (!vehicle) {
      throw new AppError(404, 'Vehicle not found');
    }

    if (vehicle.customerId !== customerId) {
      throw new AppError(403, 'Vehicle does not belong to this customer');
    }

    if (licensePlate !== vehicle.licensePlate) {
      const plateExists = await prisma.vehicle.findUnique({
        where: { licensePlate },
      });

      if (plateExists) {
        throw new AppError(400, 'License plate already registered');
      }
    }

    const updatedVehicle = await prisma.vehicle.update({
      where: { id: vehicleId },
      data: {
        make,
        model,
        year,
        licensePlate,
      },
    });

    res.json({
      status: 'success',
      data: { vehicle: updatedVehicle },
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        next(new AppError(400, 'License plate already registered'));
      } else {
        next(new AppError(500, 'Database error occurred'));
      }
    } else {
      next(error);
    }
  }
};

export const deleteVehicle = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { customerId, vehicleId } = req.params;

    const vehicle = await prisma.vehicle.findUnique({
      where: { id: vehicleId },
    });

    if (!vehicle) {
      throw new AppError(404, 'Vehicle not found');
    }

    if (vehicle.customerId !== customerId) {
      throw new AppError(403, 'Vehicle does not belong to this customer');
    }

    await prisma.vehicle.delete({
      where: { id: vehicleId },
    });

    res.status(204).send();
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      next(new AppError(500, 'Database error occurred'));
    } else {
      next(error);
    }
  }
}; 