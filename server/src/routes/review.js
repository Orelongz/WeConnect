import express from 'express';
import { ReviewController } from './../controllers';
import { ReviewMiddleware } from './../middlewares';

const { addReview, getBusinessReviews } = ReviewController;
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
  validateReview,
  businessExists,
  addReview
);

export default router;
