import express from 'express';
import ReviewController from './../controllers/reviewController';
import validateToken from './../middlewares';

const {
  getReview,
  editReview,
  deleteReview
} = ReviewController;
const router = express.Router();

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
