import { Request, Response, NextFunction } from 'express';
import prisma from '../lib/prisma';
import { AppError } from '../middleware/errorHandler';
import bcrypt from 'bcryptjs';
import { Role } from '@prisma/client';

// Create a new user (admin only)
export const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, name, phone, address, password, role } = req.body.body || req.body;

    // Check if email is already registered
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      throw new AppError(409, 'This email is already registered.');
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user
    const user = await prisma.user.create({
      data: {
        email,
        name,
        phone,
        address,
        password: hashedPassword,
        role: role || 'CUSTOMER',
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
      },
    });

    res.status(201).json({ status: 'success', data: user });
  } catch (error) {
    next(error);
  }
};

// List all users (optionally filter by role)
export const listUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { role } = req.query;
    const users = await prisma.user.findMany({
      where: role ? { role: role as Role } : {},
      select: {
        id: true,
        email: true,
        name: true,
        phone: true,
        address: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
      orderBy: { createdAt: 'desc' },
    });
    res.json({ status: 'success', data: users });
  } catch (error) {
    next(error);
  }
};

// Get user by ID (with vehicles and appointments)
export const getUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const user = await prisma.user.findUnique({
      where: { id },
      include: {
        vehicles: true,
        appointments: true,
      },
    });
    if (!user) throw new AppError(404, 'User not found');
    res.json({ status: 'success', data: user });
  } catch (error) {
    next(error);
  }
};

// Update user (admin only)
export const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const { email, name, phone, address, password, role } = req.body.body || req.body;
    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) throw new AppError(404, 'User not found');
    // Check for email uniqueness
    if (email && email !== user.email) {
      const emailExists = await prisma.user.findUnique({ where: { email } });
      if (emailExists) throw new AppError(400, 'This email is already registered to another user.');
    }
    let hashedPassword = undefined;
    if (password) {
      hashedPassword = await bcrypt.hash(password, 10);
    }
    const updated = await prisma.user.update({
      where: { id },
      data: {
        email: email ?? user.email,
        name: name ?? user.name,
        phone: phone ?? user.phone,
        address: address ?? user.address,
        role: role ?? user.role,
        ...(hashedPassword ? { password: hashedPassword } : {}),
      },
    });
    res.json({ status: 'success', data: updated });
  } catch (error) {
    next(error);
  }
};

// Delete user (admin only)
export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) throw new AppError(404, 'User not found');
    await prisma.user.delete({ where: { id } });
    res.json({ status: 'success', message: 'User deleted successfully' });
  } catch (error) {
    next(error);
  }
};

// --- CUSTOMER SELF-SERVICE: VEHICLES ---

// Get my vehicles
export const getMyVehicles = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.user!.id;
    const vehicles = await prisma.vehicle.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
    res.status(200).json({ status: 'success', data: vehicles });
  } catch (error) {
    next(error);
  }
};

// Add my vehicle
export const addMyVehicle = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.user!.id;
    const { make, model, year, licensePlate } = req.body.body || req.body;
    // Check if license plate already exists
    const existingVehicle = await prisma.vehicle.findUnique({ where: { licensePlate } });
    if (existingVehicle) throw new AppError(409, 'Vehicle with this license plate already exists');
    const vehicle = await prisma.vehicle.create({
      data: { make, model, year, licensePlate, userId },
    });
    res.status(201).json({ status: 'success', data: vehicle });
  } catch (error) {
    next(error);
  }
};

// Update my vehicle
export const updateMyVehicle = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.user!.id;
    const vehicleId = req.params.id;
    const { make, model, year, licensePlate } = req.body.body || req.body;
    // Check if vehicle belongs to user
    const existingVehicle = await prisma.vehicle.findFirst({ where: { id: vehicleId, userId } });
    if (!existingVehicle) throw new AppError(404, 'Vehicle not found');
    // Check for license plate conflict
    if (licensePlate && licensePlate !== existingVehicle.licensePlate) {
      const conflictingVehicle = await prisma.vehicle.findUnique({ where: { licensePlate } });
      if (conflictingVehicle)
        throw new AppError(409, 'Vehicle with this license plate already exists');
    }
    const vehicle = await prisma.vehicle.update({
      where: { id: vehicleId },
      data: { make, model, year, licensePlate },
    });
    res.status(200).json({ status: 'success', data: vehicle });
  } catch (error) {
    next(error);
  }
};

// Delete my vehicle
export const deleteMyVehicle = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.user!.id;
    const vehicleId = req.params.id;
    // Check if vehicle belongs to user
    const vehicle = await prisma.vehicle.findFirst({ where: { id: vehicleId, userId } });
    if (!vehicle) throw new AppError(404, 'Vehicle not found');
    await prisma.vehicle.delete({ where: { id: vehicleId } });
    res.status(200).json({ status: 'success', message: 'Vehicle deleted successfully' });
  } catch (error) {
    next(error);
  }
};

// --- CUSTOMER SELF-SERVICE: APPOINTMENTS ---

// Get my appointments
export const getMyAppointments = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.user!.id;
    const appointments = await prisma.appointment.findMany({
      where: { userId },
      include: { service: true },
      orderBy: { preferredDateTime: 'desc' },
    });
    res.status(200).json({ status: 'success', data: appointments });
  } catch (error) {
    next(error);
  }
};

// Create my appointment
export const createMyAppointment = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.user!.id;
    const { serviceId, customerName, customerPhone, vehicleModel, preferredDateTime, notes } =
      req.body.body || req.body;
    // Check if service exists
    const service = await prisma.service.findUnique({ where: { id: serviceId } });
    if (!service) throw new AppError(404, 'Service not found');
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
    });
    res.status(201).json({ status: 'success', data: appointment });
  } catch (error) {
    next(error);
  }
};

// Update my appointment
export const updateMyAppointment = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.user!.id;
    const appointmentId = req.params.id;
    const {
      serviceId,
      customerName,
      customerPhone,
      vehicleModel,
      preferredDateTime,
      notes,
      status,
    } = req.body.body || req.body;
    // Check if appointment belongs to user
    const appointment = await prisma.appointment.findFirst({
      where: { id: appointmentId, userId },
    });
    if (!appointment) throw new AppError(404, 'Appointment not found');
    // Check if service exists (if updating)
    if (serviceId && serviceId !== appointment.serviceId) {
      const service = await prisma.service.findUnique({ where: { id: serviceId } });
      if (!service) throw new AppError(404, 'Service not found');
    }
    const updated = await prisma.appointment.update({
      where: { id: appointmentId },
      data: {
        serviceId: serviceId ?? appointment.serviceId,
        customerName: customerName ?? appointment.customerName,
        customerPhone: customerPhone ?? appointment.customerPhone,
        vehicleModel: vehicleModel ?? appointment.vehicleModel,
        preferredDateTime: preferredDateTime
          ? new Date(preferredDateTime)
          : appointment.preferredDateTime,
        notes: notes ?? appointment.notes,
        status: status ?? appointment.status,
      },
    });
    res.status(200).json({ status: 'success', data: updated });
  } catch (error) {
    next(error);
  }
};

// Cancel my appointment
export const cancelMyAppointment = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.user!.id;
    const appointmentId = req.params.id;
    // Check if appointment belongs to user
    const appointment = await prisma.appointment.findFirst({
      where: { id: appointmentId, userId },
    });
    if (!appointment) throw new AppError(404, 'Appointment not found');
    const updated = await prisma.appointment.update({
      where: { id: appointmentId },
      data: { status: 'CANCELLED' },
    });
    res.status(200).json({ status: 'success', data: updated });
  } catch (error) {
    next(error);
  }
};
