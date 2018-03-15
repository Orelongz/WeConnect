import express from 'express';
import BusinessController from './../controllers/businessController';
import BusinessMiddleware from './../middlewares/businessMiddleware';
import { validateToken } from './../services/jwtService';

const {
  createBusiness,
  updateBusiness,
  deleteBusiness,
  getBusiness,
  getAllBusinesses
} = BusinessController;
const { businessValidation } = BusinessMiddleware;
const router = express.Router();

// Get all businesses
router.get('/', getAllBusinesses);

// Get a business by businessId
router.get('/:businessId', getBusiness);

// Register a business
router.post(
  '/',
  validateToken,
  businessValidation,
  createBusiness
);

// Update a business
router.put(
  '/:businessId',
  validateToken,
  businessValidation,
  updateBusiness
);

// Remove a business
router.delete(
  '/:businessId',
  validateToken,
  deleteBusiness
);

export default router;
