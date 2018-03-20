import express from 'express';
import BusinessController from './../controllers/businessController';
import BusinessMiddleware from './../middlewares/businessMiddleware';
import UserMiddleware from './../middlewares/userMiddleware';
import { validateToken } from './../services/jwtService';

const {
  createBusiness,
  updateBusiness,
  deleteBusiness,
  getBusiness,
  getAllBusinesses,
  changeBusinessOwnership
} = BusinessController;
const { businessValidation } = BusinessMiddleware;
const { findUserByEmail } = UserMiddleware;
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


// Route to transfer business ownership
router.put(
  '/change-ownership/:businessId',
  validateToken,
  findUserByEmail,
  changeBusinessOwnership
);

export default router;
