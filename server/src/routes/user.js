import express from 'express';
import UserMiddleware from './../middlewares/UserMiddleware';
import UserController from './../controllers/UserController';
import { validateToken } from './../services/jwtService';

const router = express.Router();
const {
  signup,
  login,
  updateUserDetails
} = UserController;
const {
  signUpValidation,
  validateEmail,
  signInValidation,
  updateUserValidation,
  mailExists,
  findUserByEmail
} = UserMiddleware;

router.get('/', (req, res) => res.status(200).json({
  message: 'Welcome to WeConnect'
}));

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
  '/user',
  validateToken,
  updateUserValidation,
  validateEmail,
  mailExists,
  updateUserDetails
);

export default router;
