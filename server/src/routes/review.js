import express from 'express';
import ReviewController from './../controllers/reviewController';
import ReviewMiddleware from './../middlewares/reviewMiddleware';
import { validateToken } from './../services/jwtService';

const {
  addReview,
  getBusinessReviews,
  getReview,
  editReview
} = ReviewController;
const { validateReview, businessExists } = ReviewMiddleware;
const router = express.Router({ mergeParams: true });

// Get all reviews for a business
router.get(
  '/',
  businessExists,
  getBusinessReviews
);

// Add review to a business
router.post(
  '/',
  validateToken,
  businessExists,
  validateReview,
  addReview
);

// Get user review
router.get(
  '/:reviewId',
  validateToken,
  businessExists,
  getReview
);

// Edit user review
router.put(
  '/:reviewId',
  validateToken,
  businessExists,
  validateReview,
  editReview
);

export default router;
