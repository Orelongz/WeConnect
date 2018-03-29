import express from 'express';
import ReviewController from './../controllers/ReviewController';
import ReviewMiddleware from './../middlewares/ReviewMiddleware';
import BusinessMiddleware from './../middlewares/BusinessMiddleware';
import { validateToken } from './../services/jwtService';

const {
  addReview,
  getBusinessReviews,
  getReview,
  editReview,
  deleteReview
} = ReviewController;
const { findBusiness } = BusinessMiddleware;
const { validateReview, findReview } = ReviewMiddleware;
const router = express.Router({ mergeParams: true });

// Get all reviews for a business
router.get(
  '/',
  findBusiness,
  getBusinessReviews
);

// Add review to a business
router.post(
  '/',
  validateToken,
  findBusiness,
  validateReview,
  addReview
);

// Get user review
router.get(
  '/:reviewId',
  validateToken,
  findBusiness,
  findReview,
  getReview
);

// Edit user review
router.put(
  '/:reviewId',
  validateToken,
  validateReview,
  findBusiness,
  findReview,
  editReview
);

// Delete user review
router.delete(
  '/:reviewId',
  validateToken,
  findBusiness,
  findReview,
  deleteReview
);

export default router;
