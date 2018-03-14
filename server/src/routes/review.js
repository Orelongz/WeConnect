import express from 'express';
import reviewController from './../controllers/reviewController';
import reviewMiddleware from './../middlewares/reviewMiddleware';

const { addReview } = reviewController;
const { validateReview, businessExists } = reviewMiddleware;
const router = express.Router({ mergeParams: true });

// Get all reviews for a business
// router.get('/', getBusinessReview);

// Add review to a business
router.post(
  '/',
  validateReview,
  businessExists,
  addReview
);

export default router;
