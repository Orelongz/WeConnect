import express from 'express';
import { UserMiddleware } from './../middlewares';
import { UserController } from './../controllers';

const router = express.Router();
const { signup, login, logout } = UserController;
const {
  signUpValidation,
  validateEmail,
  signInValidation
} = UserMiddleware;

// Register a user
router.post(
  '/auth/signup',
  signUpValidation,
  validateEmail,
  signup
);

// Login a user
router.post('/auth/login', signInValidation, login);

// Logout a user
router.get('/auth/logout', logout);

export default router;
