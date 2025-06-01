import { Router } from 'express';
import { tireController } from '../controllers/tire.controller';
import { authMiddleware } from '../middleware/auth.middleware';
import { validateRequest } from '../middleware/validateRequest';
import { tireValidation } from '../validations/tire.validation';

const router = Router();

// Public routes
router.get('/', tireController.getAllTires);
router.get('/:id', tireController.getTireById);

// Protected routes (admin only)
router.use(authMiddleware.requireAuth, authMiddleware.restrictTo('ADMIN'));
router.post('/', validateRequest(tireValidation.createTire), tireController.createTire);
router.put('/:id', validateRequest(tireValidation.updateTire), tireController.updateTire);
router.delete('/:id', tireController.deleteTire);

export const tireRoutes = router; 