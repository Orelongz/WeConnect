import express from 'express';
import ReviewController from './../controllers/reviewController';
import ReviewMiddleware from './../middlewares/reviewMiddleware';
import { validateToken } from './../services/jwtService';

const {
  addReview,
  getBusinessReviews,
  getReview
} = ReviewController;
const { validateReview, businessExists } = ReviewMiddleware;
const router = express.Router({ mergeParams: true });

// Get all reviews for a business
router.get(
  '/',
  businessExists,
  getBusinessReviews
);

// Get user review
router.get(
  '/:reviewId',
  validateToken,
  businessExists,
  getReview
);

// Add review to a business
router.post(
  '/',
  validateToken,
  validateReview,
  businessExists,
  addReview
);

export default router;
