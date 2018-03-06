import express from 'express';
import {
  signup,
  login
} from './../controllers/userController';

const router = express.Router({ mergeParams: true });

router.post('/auth/signup', signup);

router.post('/auth/login', login);

export default router;
