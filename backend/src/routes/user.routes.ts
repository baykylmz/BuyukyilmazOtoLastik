import { Router } from 'express';
import { authMiddleware } from '../middleware/auth.middleware';
import { validateRequest } from '../middleware/validateRequest';
import {
  listUsers,
  getUser,
  updateUser,
  deleteUser,
  getMyVehicles,
  addMyVehicle,
  updateMyVehicle,
  deleteMyVehicle,
  getMyAppointments,
  createMyAppointment,
  updateMyAppointment,
  cancelMyAppointment,
  createUser,
} from '../controllers/user.controller';
import {
  userIdSchema,
  updateUserSchema,
  createVehicleSchema,
  updateVehicleSchema,
  vehicleIdSchema,
  createAppointmentSchema,
  updateAppointmentSchema,
  appointmentIdSchema,
  createUserSchema,
} from '../validations/user.validation';

const router = Router();

/**
 * @openapi
 * /api/users:
 *   get:
 *     summary: List all users (Admin only)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: role
 *         schema:
 *           type: string
 *         description: Filter users by role (ADMIN, CUSTOMER)
 *     responses:
 *       200:
 *         description: List of users
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
 *                     $ref: '#/components/schemas/User'
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */
router.get('/', authMiddleware.requireAuth, authMiddleware.restrictTo('ADMIN'), listUsers);
router.post(
  '/',
  authMiddleware.requireAuth,
  authMiddleware.restrictTo('ADMIN'),
  validateRequest(createUserSchema),
  createUser
);

/**
 * @openapi
 * /api/users/{id}:
 *   get:
 *     summary: Get user by ID (Admin only)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     responses:
 *       200:
 *         description: User found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *   put:
 *     summary: Update user by ID (Admin only)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "new.email@example.com"
 *               name:
 *                 type: string
 *                 example: "Jane Doe"
 *               phone:
 *                 type: string
 *                 example: "+90 555 123 4567"
 *               address:
 *                 type: string
 *                 example: "123 Main St, Istanbul"
 *               password:
 *                 type: string
 *                 example: "newpassword123"
 *               role:
 *                 type: string
 *                 enum: [ADMIN, CUSTOMER]
 *                 example: "CUSTOMER"
 *     responses:
 *       200:
 *         description: User updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/User'
 *       400:
 *         description: Bad request - validation error
 *       404:
 *         description: User not found
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *   delete:
 *     summary: Delete user by ID (Admin only)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     responses:
 *       200:
 *         description: User deleted
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
 *         description: User not found
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */
router.get(
  '/:id',
  authMiddleware.requireAuth,
  authMiddleware.restrictTo('ADMIN'),
  validateRequest(userIdSchema),
  getUser
);
router.put(
  '/:id',
  authMiddleware.requireAuth,
  authMiddleware.restrictTo('ADMIN'),
  validateRequest(updateUserSchema),
  updateUser
);
router.delete(
  '/:id',
  authMiddleware.requireAuth,
  authMiddleware.restrictTo('ADMIN'),
  validateRequest(userIdSchema),
  deleteUser
);

// --- CUSTOMER SELF-SERVICE ROUTES ---
// All require authentication and CUSTOMER role
router.use('/me', authMiddleware.requireAuth, authMiddleware.restrictTo('CUSTOMER'));

// Vehicle management
router.get('/me/vehicles', getMyVehicles);
router.post('/me/vehicles', validateRequest(createVehicleSchema), addMyVehicle);
router.put('/me/vehicles/:id', validateRequest(updateVehicleSchema), updateMyVehicle);
router.delete('/me/vehicles/:id', validateRequest(vehicleIdSchema), deleteMyVehicle);

// Appointment management
router.get('/me/appointments', getMyAppointments);
router.post('/me/appointments', validateRequest(createAppointmentSchema), createMyAppointment);
router.put('/me/appointments/:id', validateRequest(updateAppointmentSchema), updateMyAppointment);
router.patch(
  '/me/appointments/:id/cancel',
  validateRequest(appointmentIdSchema),
  cancelMyAppointment
);

export { router as userRoutes };
