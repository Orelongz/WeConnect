import express from 'express';
import addReview from './../controllers/reviewController';
import validateReview from './../middlewares/reviewMiddleware';

const router = express.Router({ mergeParams: true });

router.post('/', validateReview, addReview);

export default router;
