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

// Public routes (for QR code scanning)
router.get('/qr/:qrCodeId', tireController.getTireByQrCode);

// Protected routes (admin only)
router.use(authMiddleware.requireAuth, authMiddleware.restrictTo('ADMIN'));

router.get('/', tireController.getAllTires);
router.get('/:id', validateRequest(tireIdSchema), tireController.getTire);
router.get('/:id/qr', validateRequest(tireIdSchema), tireController.generateQRCode);
router.get('/:id/stock-history', validateRequest(tireIdSchema), tireController.getStockHistory);

router.post('/', validateRequest(createTireSchema), tireController.createTire);
router.put('/:id', validateRequest(updateTireSchema), tireController.updateTire);
router.patch('/:id/stock', validateRequest(updateStockSchema), tireController.updateStock);
router.delete('/:id', validateRequest(tireIdSchema), tireController.deleteTire);

export { router as tireRoutes }; 