import { Router, Request, Response, NextFunction } from 'express';
import { validateRequest } from '../middleware/validateRequest';
import { authMiddleware } from '../middleware/auth.middleware';
import {
  getMyVehicles,
  addMyVehicle,
  updateMyVehicle,
  deleteMyVehicle,
  getMyAppointments,
  createMyAppointment,
  updateMyAppointment,
  cancelMyAppointment,
} from '../controllers/customerUser.controller';
import {
  createVehicleSchema,
  updateVehicleSchema,
  vehicleIdSchema,
  createAppointmentSchema,
  updateAppointmentSchema,
  appointmentIdSchema,
} from '../validations/customerUser.validation';
import { AppError } from '../middleware/errorHandler';
import prisma from '../lib/prisma';

const router = Router();

// All routes require customer authentication
router.use(authMiddleware.requireAuth, authMiddleware.restrictTo('CUSTOMER'));

/**
 * @openapi
 * /api/customer/vehicles:
 *   get:
 *     summary: Get my vehicles (Customer only)
 *     tags: [Customer Vehicles]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of customer's vehicles
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Vehicle'
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Customer access required
 *   post:
 *     summary: Add my vehicle (Customer only)
 *     tags: [Customer Vehicles]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - make
 *               - model
 *               - year
 *               - licensePlate
 *             properties:
 *               make:
 *                 type: string
 *                 example: "Toyota"
 *               model:
 *                 type: string
 *                 example: "Corolla"
 *               year:
 *                 type: integer
 *                 example: 2020
 *               licensePlate:
 *                 type: string
 *                 example: "34 ABC 123"
 *     responses:
 *       201:
 *         description: Vehicle added successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/Vehicle'
 *       400:
 *         description: Bad request - validation error
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Customer access required
 *       409:
 *         description: Vehicle with this license plate already exists
 */
router.get('/vehicles', getMyVehicles);
router.post('/vehicles', validateRequest(createVehicleSchema), addMyVehicle);

/**
 * @openapi
 * /api/customer/vehicles/{id}:
 *   put:
 *     summary: Update my vehicle (Customer only)
 *     tags: [Customer Vehicles]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Vehicle ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               make:
 *                 type: string
 *                 example: "Honda"
 *               model:
 *                 type: string
 *                 example: "Civic"
 *               year:
 *                 type: integer
 *                 example: 2021
 *               licensePlate:
 *                 type: string
 *                 example: "34 XYZ 789"
 *     responses:
 *       200:
 *         description: Vehicle updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/Vehicle'
 *       400:
 *         description: Bad request - validation error
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Customer access required
 *       404:
 *         description: Vehicle not found
 *       409:
 *         description: Vehicle with this license plate already exists
 *   delete:
 *     summary: Delete my vehicle (Customer only)
 *     tags: [Customer Vehicles]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Vehicle ID
 *     responses:
 *       200:
 *         description: Vehicle deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 message:
 *                   type: string
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Customer access required
 *       404:
 *         description: Vehicle not found
 */
router.put('/vehicles/:id', validateRequest(updateVehicleSchema), updateMyVehicle);
router.delete('/vehicles/:id', validateRequest(vehicleIdSchema), deleteMyVehicle);

/**
 * @openapi
 * /api/customer/appointments:
 *   get:
 *     summary: Get my appointments (Customer only)
 *     tags: [Customer Appointments]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of customer's appointments
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Appointment'
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Customer access required
 *   post:
 *     summary: Create appointment (Customer only)
 *     tags: [Customer Appointments]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - serviceId
 *               - customerName
 *               - customerPhone
 *               - vehicleModel
 *               - preferredDateTime
 *             properties:
 *               serviceId:
 *                 type: string
 *                 format: uuid
 *                 example: "123e4567-e89b-12d3-a456-426614174000"
 *               customerName:
 *                 type: string
 *                 example: "John Doe"
 *               customerPhone:
 *                 type: string
 *                 example: "+90 212 555 0123"
 *               vehicleModel:
 *                 type: string
 *                 example: "Toyota Corolla 2020"
 *               preferredDateTime:
 *                 type: string
 *                 format: date-time
 *                 example: "2024-01-15T10:00:00Z"
 *               notes:
 *                 type: string
 *                 example: "Need tire rotation and alignment"
 *     responses:
 *       201:
 *         description: Appointment created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/Appointment'
 *       400:
 *         description: Bad request - validation error
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Customer access required
 *       409:
 *         description: Time slot already booked
 */
router.get('/appointments', getMyAppointments);
router.post('/appointments', validateRequest(createAppointmentSchema), createMyAppointment);

/**
 * @openapi
 * /api/customer/appointments/{id}:
 *   put:
 *     summary: Update my appointment (Customer only)
 *     tags: [Customer Appointments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Appointment ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               preferredDateTime:
 *                 type: string
 *                 format: date-time
 *                 example: "2024-01-16T14:00:00Z"
 *               notes:
 *                 type: string
 *                 example: "Updated notes"
 *     responses:
 *       200:
 *         description: Appointment updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/Appointment'
 *       400:
 *         description: Bad request - validation error
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Customer access required
 *       404:
 *         description: Appointment not found
 *       409:
 *         description: Time slot already booked
 *   delete:
 *     summary: Cancel my appointment (Customer only)
 *     tags: [Customer Appointments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Appointment ID
 *     responses:
 *       200:
 *         description: Appointment cancelled successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 message:
 *                   type: string
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Customer access required
 *       404:
 *         description: Appointment not found
 */
router.put('/appointments/:id', validateRequest(updateAppointmentSchema), updateMyAppointment);
router.delete('/appointments/:id', validateRequest(appointmentIdSchema), cancelMyAppointment);

/**
 * @openapi
 * /api/customer/test/vehicle:
 *   post:
 *     summary: Test endpoint - Create a sample vehicle (Customer only)
 *     tags: [Customer Vehicles]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Sample vehicle created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/Vehicle'
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Customer access required
 */
router.post('/test/vehicle', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.user!.id;
    
    // Create sample vehicle data
    const sampleVehicle = {
      make: 'Toyota',
      model: 'Corolla',
      year: 2020,
      licensePlate: `TEST-${Date.now()}`,
    };

    // Check if license plate already exists
    const existingVehicle = await prisma.vehicle.findUnique({
      where: { licensePlate: sampleVehicle.licensePlate },
    });

    if (existingVehicle) {
      throw new AppError(409, 'Test vehicle already exists');
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
        ...sampleVehicle,
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
});

/**
 * @openapi
 * /api/customer/test/appointment:
 *   post:
 *     summary: Test endpoint - Create a sample appointment (Customer only)
 *     tags: [Customer Appointments]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Sample appointment created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/Appointment'
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Customer access required
 */
router.post('/test/appointment', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.user!.id;
    
    // Create sample appointment data
    const sampleAppointment = {
      serviceId: '123e4567-e89b-12d3-a456-426614174000', // Sample service ID
      customerName: 'John Doe',
      customerPhone: '+90 212 555 0123',
      vehicleModel: 'Toyota Corolla 2020',
      preferredDateTime: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // Tomorrow
      notes: 'Test appointment - tire rotation needed',
    };

    // Check if service exists (create a sample one if not)
    let service = await prisma.service.findUnique({
      where: { id: sampleAppointment.serviceId },
    });

    if (!service) {
      service = await prisma.service.create({
        data: {
          id: sampleAppointment.serviceId,
          name: 'Tire Rotation',
          description: 'Rotate tires for even wear',
          price: 150.00,
          durationMinutes: 60,
        },
      });
    }

    const appointment = await prisma.appointment.create({
      data: {
        ...sampleAppointment,
        userId: userId,
        status: 'PENDING',
      },
    });

    res.status(201).json({
      status: 'success',
      data: appointment,
    });
  } catch (error) {
    next(error);
  }
});

export { router as customerUserRoutes }; 