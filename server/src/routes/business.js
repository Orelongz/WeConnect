import express from 'express';
import BusinessController from './../controllers/businessController';
import validateToken from './../middlewares/userMiddleware';

const {
  createBusiness,
  updateBusiness,
  deleteBusiness,
  getBusiness,
  getAllBusinesses,
  changeBusinessOwnership,
  getUserBusinesses
} = BusinessController;
const router = express.Router();

// Get all businesses
router.get('/', getAllBusinesses);

// Route to get all user businesses
router.get(
  '/user',
  validateToken,
  getUserBusinesses
);

// Route to transfer business ownership
router.put(
  '/change-ownership/:businessId',
  validateToken,
  changeBusinessOwnership
);

// Get a business by businessId
router.get(
  '/:businessId',
  getBusiness
);

// Register a business
router.post(
  '/',
  validateToken,
  createBusiness
);

// Update a business
router.put(
  '/:businessId',
  validateToken,
  updateBusiness
);

// Remove a business
router.delete(
  '/:businessId',
  validateToken,
  deleteBusiness
);

export default router;
