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
  changeBusinessOwnership,
  getUserBusinesses
} = BusinessController;
const {
  businessValidation,
  findBusiness,
  businessNameExist
} = BusinessMiddleware;
const { findUserByEmail } = UserMiddleware;
const router = express.Router();

// Get all businesses
router.get('/', getAllBusinesses);

// Route to get all user businesses
router.get(
  '/user',
  validateToken,
  getUserBusinesses
);

// Get a business by businessId
router.get(
  '/:businessId',
  findBusiness,
  getBusiness
);

// Register a business
router.post(
  '/',
  validateToken,
  businessValidation,
  businessNameExist,
  createBusiness
);

// Update a business
router.put(
  '/:businessId',
  validateToken,
  businessValidation,
  findBusiness,
  businessNameExist,
  updateBusiness
);

// Remove a business
router.delete(
  '/:businessId',
  validateToken,
  findBusiness,
  deleteBusiness
);

// Route to transfer business ownership
router.put(
  '/change-ownership/:businessId',
  validateToken,
  findUserByEmail,
  findBusiness,
  changeBusinessOwnership
);

export default router;
