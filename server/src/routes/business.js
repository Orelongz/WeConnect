import express from 'express';
import BusinessController from './../controllers/businessController';
import ReviewController from './../controllers/reviewController';
import validateToken from './../middlewares';
import ImageUpload from './../middlewares/imageUpload';

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
  addReview,
  getBusinessReviews,
  getBusinessRating
} = ReviewController;
const router = express.Router();

// Get all businesses
router.get('/', getAllBusinesses);

// Register a business
router.post(
  '/',
  validateToken,
  ImageUpload.single('businessImage'),
  createBusiness
);

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

// Get all reviews for a business
router.get(
  '/:businessId/reviews',
  getBusinessReviews
);

// Add review to a business
router.post(
  '/:businessId/reviews',
  validateToken,
  addReview
);

// Get business rating
router.get(
  '/:businessId/rating',
  getBusinessRating
);

export default router;
