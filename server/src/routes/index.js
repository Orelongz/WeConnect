import express from 'express';
import {
  signup,
  login
} from './../controllers/userController';
import {
  signUpValidation,
  signInValidation,
  validateEmail
} from './../middlewares/userMiddleware';

const router = express.Router();

// Register a user
router.post('/auth/signup', signUpValidation, validateEmail, signup);

// Login a user
router.post('/auth/login', signInValidation, login);

export default router;
