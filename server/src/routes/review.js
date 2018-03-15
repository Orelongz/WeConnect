import express from 'express';
import { ReviewController } from './../controllers';
import { ReviewMiddleware } from './../middlewares';
import { validateToken } from './../services/jwtService';

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
  validateToken,
  validateReview,
  businessExists,
  addReview
);

export default router;
