import express from 'express';
import ReviewController from './../controllers/reviewController';
import validateToken from './../middlewares';

const {
  addReview,
  getBusinessReviews,
  getReview,
  editReview,
  deleteReview
} = ReviewController;
const router = express.Router({ mergeParams: true });

// Get all reviews for a business
router.get(
  '/',
  getBusinessReviews
);

// Add review to a business
router.post(
  '/',
  validateToken,
  addReview
);

// Get user review
router.get(
  '/:reviewId',
  validateToken,
  getReview
);

// Edit user review
router.put(
  '/:reviewId',
  validateToken,
  editReview
);

// Delete user review
router.delete(
  '/:reviewId',
  validateToken,
  deleteReview
);

export default router;
