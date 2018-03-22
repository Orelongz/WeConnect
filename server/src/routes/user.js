import express from 'express';
import UserMiddleware from './../middlewares/userMiddleware';
import UserController from './../controllers/userController';
import { validateToken } from './../services/jwtService';

const router = express.Router();
const {
  signup,
  login,
  updateUserDetails,
  logout
} = UserController;
const {
  signUpValidation,
  validateEmail,
  signInValidation,
  mailExists,
  findUserByEmail
} = UserMiddleware;

// Register a user
router.post(
  '/auth/signup',
  signUpValidation,
  validateEmail,
  mailExists,
  signup
);

// Login a user
router.post(
  '/auth/login',
  signInValidation,
  findUserByEmail,
  login
);

// Edits user details
router.put(
  '/auth/user',
  validateToken,
  signUpValidation,
  validateEmail,
  mailExists,
  updateUserDetails
);

// Logout a user
router.get('/auth/logout', logout);

export default router;
