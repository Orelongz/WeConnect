import express from 'express';
import userController from './../controllers/userController';
import userMiddleware from './../middlewares/userMiddleware';

const router = express.Router();
const { signup, login, logout } = userController;
const {
  signUpValidation,
  validateEmail,
  signInValidation
} = userMiddleware;

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
