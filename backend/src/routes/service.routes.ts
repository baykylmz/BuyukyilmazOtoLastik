import { Router } from 'express';
import { validateRequest } from '../middleware/validateRequest';
import { authMiddleware } from '../middleware/auth.middleware';
import {
  getServices,
  getService,
  createService,
  updateService,
  deleteService,
} from '../controllers/service.controller';
import {
  createServiceSchema,
  updateServiceSchema,
  serviceIdSchema,
} from '../validations/service.validation';

const router = Router();

/**
 * @openapi
 * /api/services:
 *   get:
 *     summary: Get all services (Public)
 *     tags: [Services]
 *     responses:
 *       200:
 *         description: List of all services
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
 *                     $ref: '#/components/schemas/Service'
 *   post:
 *     summary: Create a new service (Admin only)
 *     tags: [Services]
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
 *               - description
 *               - price
 *               - durationMinutes
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Tire Rotation"
 *               description:
 *                 type: string
 *                 example: "Rotate tires for even wear"
 *               price:
 *                 type: number
 *                 example: 150.00
 *               durationMinutes:
 *                 type: integer
 *                 example: 60
 *     responses:
 *       201:
 *         description: Service created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/Service'
 *       400:
 *         description: Bad request - validation error
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Admin access required
 *       409:
 *         description: Service with this name already exists
 */
router.get('/', getServices);
router.post(
  '/',
  authMiddleware.requireAuth,
  authMiddleware.restrictTo('ADMIN'),
  validateRequest(createServiceSchema),
  createService
);

/**
 * @openapi
 * /api/services/{id}:
 *   get:
 *     summary: Get service by ID (Public)
 *     tags: [Services]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Service ID
 *     responses:
 *       200:
 *         description: Service found successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/Service'
 *       404:
 *         description: Service not found
 *   put:
 *     summary: Update service by ID (Admin only)
 *     tags: [Services]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Service ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Tire Rotation Updated"
 *               description:
 *                 type: string
 *                 example: "Rotate tires for even wear and balance"
 *               price:
 *                 type: number
 *                 example: 180.00
 *               durationMinutes:
 *                 type: integer
 *                 example: 75
 *     responses:
 *       200:
 *         description: Service updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/Service'
 *       400:
 *         description: Bad request - validation error
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Admin access required
 *       404:
 *         description: Service not found
 *       409:
 *         description: Service with this name already exists
 *   delete:
 *     summary: Delete service by ID (Admin only)
 *     tags: [Services]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Service ID
 *     responses:
 *       200:
 *         description: Service deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 message:
 *                   type: string
 *       400:
 *         description: Cannot delete service with appointments
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Admin access required
 *       404:
 *         description: Service not found
 */
router.get('/:id', validateRequest(serviceIdSchema), getService);
router.put(
  '/:id',
  authMiddleware.requireAuth,
  authMiddleware.restrictTo('ADMIN'),
  validateRequest(updateServiceSchema),
  updateService
);
router.delete(
  '/:id',
  authMiddleware.requireAuth,
  authMiddleware.restrictTo('ADMIN'),
  validateRequest(serviceIdSchema),
  deleteService
);

export { router as serviceRoutes };
