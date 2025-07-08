import { Request, Response, NextFunction } from 'express';
import { AppError } from '../middleware/errorHandler';
import prisma from '../lib/prisma';

// Vehicle Management for Customers
export const getMyVehicles = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.user!.id;

    const vehicles = await prisma.vehicle.findMany({
      where: {
        userId: userId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    res.status(200).json({
      status: 'success',
      data: vehicles,
    });
  } catch (error) {
    next(error);
  }
};

export const addMyVehicle = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.user!.id;
    const { make, model, year, licensePlate } = req.body;

    // Check if license plate already exists
    const existingVehicle = await prisma.vehicle.findUnique({
      where: { licensePlate },
    });

    if (existingVehicle) {
      throw new AppError(409, 'Vehicle with this license plate already exists');
    }

    // Create customer record if it doesn't exist
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new AppError(404, 'User not found');
    }

    let customer = await prisma.customer.findUnique({
      where: { email: user.email },
    });

    if (!customer) {
      customer = await prisma.customer.create({
        data: {
          name: user.name,
          email: user.email,
          phone: user.phone || '',
        },
      });
    }

    const vehicle = await prisma.vehicle.create({
      data: {
        make,
        model,
        year,
        licensePlate,
        customerId: customer.id,
        userId: userId,
      },
    });

    res.status(201).json({
      status: 'success',
      data: vehicle,
    });
  } catch (error) {
    next(error);
  }
};

export const updateMyVehicle = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.user!.id;
    const vehicleId = req.params.id;
    const { make, model, year, licensePlate } = req.body;

    // Check if vehicle belongs to user
    const existingVehicle = await prisma.vehicle.findFirst({
      where: {
        id: vehicleId,
        userId: userId,
      },
    });

    if (!existingVehicle) {
      throw new AppError(404, 'Vehicle not found');
    }

    // Check if new license plate conflicts with other vehicles
    if (licensePlate && licensePlate !== existingVehicle.licensePlate) {
      const conflictingVehicle = await prisma.vehicle.findUnique({
        where: { licensePlate },
      });

      if (conflictingVehicle) {
        throw new AppError(409, 'Vehicle with this license plate already exists');
      }
    }

    const vehicle = await prisma.vehicle.update({
      where: { id: vehicleId },
      data: {
        make,
        model,
        year,
        licensePlate,
      },
    });

    res.status(200).json({
      status: 'success',
      data: vehicle,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteMyVehicle = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.user!.id;
    const vehicleId = req.params.id;

    // Check if vehicle belongs to user
    const vehicle = await prisma.vehicle.findFirst({
      where: {
        id: vehicleId,
        userId: userId,
      },
    });

    if (!vehicle) {
      throw new AppError(404, 'Vehicle not found');
    }

    await prisma.vehicle.delete({
      where: { id: vehicleId },
    });

    res.status(200).json({
      status: 'success',
      message: 'Vehicle deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

// Appointment Management for Customers
export const getMyAppointments = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.user!.id;

    const appointments = await prisma.appointment.findMany({
      where: {
        userId: userId,
      },
      include: {
        service: true,
      },
      orderBy: {
        preferredDateTime: 'desc',
      },
    });

    res.status(200).json({
      status: 'success',
      data: appointments,
    });
  } catch (error) {
    next(error);
  }
};

export const createMyAppointment = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.user!.id;
    const { serviceId, customerName, customerPhone, vehicleModel, preferredDateTime, notes } = req.body;

    // Check if service exists
    const service = await prisma.service.findUnique({
      where: { id: serviceId },
    });

    if (!service) {
      throw new AppError(404, 'Service not found');
    }

    // Check for booking conflicts
    const conflictingAppointment = await prisma.appointment.findFirst({
      where: {
        preferredDateTime: new Date(preferredDateTime),
        status: {
          in: ['PENDING', 'CONFIRMED'],
        },
      },
    });

    if (conflictingAppointment) {
      throw new AppError(409, 'This time slot is already booked');
    }

    const appointment = await prisma.appointment.create({
      data: {
        serviceId,
        userId,
        customerName,
        customerPhone,
        vehicleModel,
        preferredDateTime: new Date(preferredDateTime),
        notes,
      },
      include: {
        service: true,
      },
    });

    res.status(201).json({
      status: 'success',
      data: appointment,
    });
  } catch (error) {
    next(error);
  }
};

export const updateMyAppointment = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.user!.id;
    const appointmentId = req.params.id;
    const { preferredDateTime, notes } = req.body;

    // Check if appointment belongs to user
    const existingAppointment = await prisma.appointment.findFirst({
      where: {
        id: appointmentId,
        userId: userId,
      },
    });

    if (!existingAppointment) {
      throw new AppError(404, 'Appointment not found');
    }

    // Check if appointment can be modified
    if (existingAppointment.status === 'COMPLETED' || existingAppointment.status === 'CANCELLED') {
      throw new AppError(400, 'Cannot modify completed or cancelled appointments');
    }

    // Check for booking conflicts if time is being changed
    if (preferredDateTime && preferredDateTime !== existingAppointment.preferredDateTime.toISOString()) {
      const conflictingAppointment = await prisma.appointment.findFirst({
        where: {
          preferredDateTime: new Date(preferredDateTime),
          status: {
            in: ['PENDING', 'CONFIRMED'],
          },
          id: {
            not: appointmentId,
          },
        },
      });

      if (conflictingAppointment) {
        throw new AppError(409, 'This time slot is already booked');
      }
    }

    const appointment = await prisma.appointment.update({
      where: { id: appointmentId },
      data: {
        preferredDateTime: preferredDateTime ? new Date(preferredDateTime) : undefined,
        notes,
      },
      include: {
        service: true,
      },
    });

    res.status(200).json({
      status: 'success',
      data: appointment,
    });
  } catch (error) {
    next(error);
  }
};

export const cancelMyAppointment = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.user!.id;
    const appointmentId = req.params.id;

    // Check if appointment belongs to user
    const appointment = await prisma.appointment.findFirst({
      where: {
        id: appointmentId,
        userId: userId,
      },
    });

    if (!appointment) {
      throw new AppError(404, 'Appointment not found');
    }

    // Check if appointment can be cancelled
    if (appointment.status === 'COMPLETED') {
      throw new AppError(400, 'Cannot cancel completed appointments');
    }

    await prisma.appointment.update({
      where: { id: appointmentId },
      data: {
        status: 'CANCELLED',
      },
    });

    res.status(200).json({
      status: 'success',
      message: 'Appointment cancelled successfully',
    });
  } catch (error) {
    next(error);
  }
}; 