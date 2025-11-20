import { Router } from 'express';
import { validateRequest } from '../middleware/validateRequest';
import { authMiddleware } from '../middleware/auth.middleware';
import { tireController } from '../controllers/tire.controller';
import {
  createTireSchema,
  updateTireSchema,
  tireIdSchema,
  updateStockSchema,
} from '../validations/tire.validation';

const router = Router();

/**
 * @openapi
 * /api/tires/qr/{qrCodeId}:
 *   get:
 *     summary: Get tire by QR code (Public)
 *     tags: [Tires]
 *     parameters:
 *       - in: path
 *         name: qrCodeId
 *         required: true
 *         schema:
 *           type: string
 *         description: QR code ID of the tire
 *     responses:
 *       200:
 *         description: Tire found successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/Tire'
 *       404:
 *         description: Tire not found
 */
router.get('/qr/:qrCodeId', tireController.getTireByQrCode);

// Protected routes (admin only)
router.use(authMiddleware.requireAuth, authMiddleware.restrictTo('ADMIN'));

/**
 * @openapi
 * /api/tires:
 *   get:
 *     summary: Get all tires (Admin only)
 *     tags: [Tires]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all tires
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
 *                     $ref: '#/components/schemas/Tire'
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Admin access required
 *   post:
 *     summary: Create a new tire (Admin only)
 *     tags: [Tires]
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
 *               - brand
 *               - size
 *               - season
 *               - price
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Michelin Pilot Sport 4"
 *               brand:
 *                 type: string
 *                 example: "Michelin"
 *               size:
 *                 type: string
 *                 example: "205/55R16"
 *               season:
 *                 type: string
 *                 enum: [SUMMER, WINTER, ALL_SEASON]
 *                 example: "SUMMER"
 *               price:
 *                 type: number
 *                 example: 2500.00
 *               imageURL:
 *                 type: string
 *                 example: "https://example.com/tire-image.jpg"
 *               description:
 *                 type: string
 *                 example: "High-performance summer tire"
 *     responses:
 *       201:
 *         description: Tire created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/Tire'
 *       400:
 *         description: Bad request - validation error
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Admin access required
 */
router.get('/', tireController.getAllTires);
router.post('/', validateRequest(createTireSchema), tireController.createTire);

/**
 * @openapi
 * /api/tires/{id}:
 *   get:
 *     summary: Get tire by ID (Admin only)
 *     tags: [Tires]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Tire ID
 *     responses:
 *       200:
 *         description: Tire found successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/Tire'
 *       404:
 *         description: Tire not found
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Admin access required
 *   put:
 *     summary: Update tire by ID (Admin only)
 *     tags: [Tires]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Tire ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               brand:
 *                 type: string
 *               size:
 *                 type: string
 *               season:
 *                 type: string
 *                 enum: [SUMMER, WINTER, ALL_SEASON]
 *               price:
 *                 type: number
 *               imageURL:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Tire updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/Tire'
 *       404:
 *         description: Tire not found
 *       400:
 *         description: Bad request - validation error
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Admin access required
 *   delete:
 *     summary: Delete tire by ID (Admin only)
 *     tags: [Tires]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Tire ID
 *     responses:
 *       200:
 *         description: Tire deleted successfully
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
 *         description: Tire not found
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Admin access required
 */
router.get('/:id', validateRequest(tireIdSchema), tireController.getTire);
router.put('/:id', validateRequest(updateTireSchema), tireController.updateTire);
router.delete('/:id', validateRequest(tireIdSchema), tireController.deleteTire);

/**
 * @openapi
 * /api/tires/{id}/qr:
 *   get:
 *     summary: Generate QR code for tire (Admin only)
 *     tags: [Tires]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Tire ID
 *     responses:
 *       200:
 *         description: QR code generated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     qrCodeUrl:
 *                       type: string
 *       404:
 *         description: Tire not found
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Admin access required
 */
router.get('/:id/qr', validateRequest(tireIdSchema), tireController.generateQRCode);

/**
 * @openapi
 * /api/tires/{id}/stock-history:
 *   get:
 *     summary: Get stock history for tire (Admin only)
 *     tags: [Tires]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Tire ID
 *     responses:
 *       200:
 *         description: Stock history retrieved successfully
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
 *                     $ref: '#/components/schemas/StockChangeLog'
 *       404:
 *         description: Tire not found
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Admin access required
 */
router.get('/:id/stock-history', validateRequest(tireIdSchema), tireController.getStockHistory);

/**
 * @openapi
 * /api/tires/{id}/stock:
 *   patch:
 *     summary: Update tire stock (Admin only)
 *     tags: [Tires]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Tire ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - change
 *               - reason
 *             properties:
 *               change:
 *                 type: integer
 *                 description: Positive for additions, negative for reductions
 *                 example: 5
 *               reason:
 *                 type: string
 *                 example: "New shipment received"
 *     responses:
 *       200:
 *         description: Stock updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/Tire'
 *       400:
 *         description: Bad request - insufficient stock or validation error
 *       404:
 *         description: Tire not found
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Admin access required
 */
router.patch('/:id/stock', validateRequest(updateStockSchema), tireController.updateStock);

export { router as tireRoutes };
