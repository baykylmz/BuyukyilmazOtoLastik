import { Router } from 'express';
import { validateRequest } from '../middleware/validateRequest';
import { authenticate } from '../middleware/auth';
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

// Customer routes
router.get('/', authenticate, getCustomers);
router.get('/:id', authenticate, validateRequest(customerIdSchema), getCustomer);
router.post('/', authenticate, validateRequest(createCustomerSchema), createCustomer);
router.put('/:id', authenticate, validateRequest(updateCustomerSchema), updateCustomer);
router.delete('/:id', authenticate, validateRequest(customerIdSchema), deleteCustomer);

// Vehicle routes
router.post('/:customerId/vehicles', authenticate, validateRequest(createVehicleSchema), addVehicle);
router.put('/:customerId/vehicles/:vehicleId', authenticate, validateRequest(updateVehicleSchema), updateVehicle);
router.delete('/:customerId/vehicles/:vehicleId', authenticate, validateRequest(vehicleIdSchema), deleteVehicle);

export default router; 