import express from 'express';
// import { addReview, getBusinessReview } from './../controllers/reviewController';
// import validateReview from './../middlewares/reviewMiddleware';

const router = express.Router({ mergeParams: true });

// Get all reviews for a business
// router.get('/', getBusinessReview);

// Add review to a business
// router.post('/', validateReview, addReview);

export default router;
