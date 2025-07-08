import { Router } from 'express';
import { validateRequest } from '../middleware/validateRequest';
import { authMiddleware } from '../middleware/auth.middleware';
import {
  getCustomers,
  getCustomer,
  createCustomer,
  updateCustomer,
  deleteCustomer,
  addVehicle,
  updateVehicle,
  deleteVehicle,
} from '../controllers/customer.controller';
import {
  createCustomerSchema,
  updateCustomerSchema,
  customerIdSchema,
  createVehicleSchema,
  updateVehicleSchema,
  vehicleIdSchema,
} from '../validations/customer.validation';

const router = Router();

/**
 * @openapi
 * /api/customers:
 *   get:
 *     summary: Get all customers (Authenticated)
 *     tags: [Customers]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all customers
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
 *                     $ref: '#/components/schemas/Customer'
 *       401:
 *         description: Unauthorized
 *   post:
 *     summary: Create a new customer (Authenticated)
 *     tags: [Customers]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - phone
 *             properties:
 *               name:
 *                 type: string
 *                 example: "John Doe"
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "john.doe@example.com"
 *               phone:
 *                 type: string
 *                 example: "+90 212 555 0123"
 *               address:
 *                 type: string
 *                 example: "123 Main Street, Istanbul"
 *     responses:
 *       201:
 *         description: Customer created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/Customer'
 *       400:
 *         description: Bad request - validation error
 *       401:
 *         description: Unauthorized
 *       409:
 *         description: Customer with this email already exists
 */
router.get('/', authMiddleware.requireAuth, getCustomers);
router.post('/', authMiddleware.requireAuth, validateRequest(createCustomerSchema), createCustomer);

/**
 * @openapi
 * /api/customers/{id}:
 *   get:
 *     summary: Get customer by ID (Authenticated)
 *     tags: [Customers]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Customer ID
 *     responses:
 *       200:
 *         description: Customer found successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/Customer'
 *       404:
 *         description: Customer not found
 *       401:
 *         description: Unauthorized
 *   put:
 *     summary: Update customer by ID (Authenticated)
 *     tags: [Customers]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Customer ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "John Doe Updated"
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "john.updated@example.com"
 *               phone:
 *                 type: string
 *                 example: "+90 212 555 9999"
 *               address:
 *                 type: string
 *                 example: "456 New Street, Istanbul"
 *     responses:
 *       200:
 *         description: Customer updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/Customer'
 *       404:
 *         description: Customer not found
 *       400:
 *         description: Bad request - validation error
 *       401:
 *         description: Unauthorized
 *       409:
 *         description: Customer with this email already exists
 *   delete:
 *     summary: Delete customer by ID (Authenticated)
 *     tags: [Customers]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Customer ID
 *     responses:
 *       200:
 *         description: Customer deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 message:
 *                   type: string
 *       404:
 *         description: Customer not found
 *       401:
 *         description: Unauthorized
 */
router.get('/:id', authMiddleware.requireAuth, validateRequest(customerIdSchema), getCustomer);
router.put('/:id', authMiddleware.requireAuth, validateRequest(updateCustomerSchema), updateCustomer);
router.delete('/:id', authMiddleware.requireAuth, validateRequest(customerIdSchema), deleteCustomer);

/**
 * @openapi
 * /api/customers/{customerId}/vehicles:
 *   post:
 *     summary: Add vehicle to customer (Authenticated)
 *     tags: [Vehicles]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: customerId
 *         required: true
 *         schema:
 *           type: string
 *         description: Customer ID
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
 *       404:
 *         description: Customer not found
 *       409:
 *         description: Vehicle with this license plate already exists
 */
router.post('/:customerId/vehicles', authMiddleware.requireAuth, validateRequest(createVehicleSchema), addVehicle);

/**
 * @openapi
 * /api/customers/{customerId}/vehicles/{vehicleId}:
 *   put:
 *     summary: Update vehicle (Authenticated)
 *     tags: [Vehicles]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: customerId
 *         required: true
 *         schema:
 *           type: string
 *         description: Customer ID
 *       - in: path
 *         name: vehicleId
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
 *       404:
 *         description: Customer or vehicle not found
 *       409:
 *         description: Vehicle with this license plate already exists
 *   delete:
 *     summary: Delete vehicle (Authenticated)
 *     tags: [Vehicles]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: customerId
 *         required: true
 *         schema:
 *           type: string
 *         description: Customer ID
 *       - in: path
 *         name: vehicleId
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
 *       404:
 *         description: Customer or vehicle not found
 *       401:
 *         description: Unauthorized
 */
router.put('/:customerId/vehicles/:vehicleId', authMiddleware.requireAuth, validateRequest(updateVehicleSchema), updateVehicle);
router.delete('/:customerId/vehicles/:vehicleId', authMiddleware.requireAuth, validateRequest(vehicleIdSchema), deleteVehicle);

export default router; 