import express from 'express';
import signup from './../controllers/userController';

const router = express.Router({ mergeParams: true });

router.post('/auth/signup', signup);

export default router;
