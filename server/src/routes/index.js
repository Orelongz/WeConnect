import express from 'express';
import userController from './../controllers/userController';
import userMiddleware from './../middlewares/userMiddleware';

const router = express.Router();
const {
  signUpValidation,
  validateEmail
} = userMiddleware;
const { signup } = userController;

// Register a user
router.post(
  '/auth/signup',
  signUpValidation,
  validateEmail,
  signup
);

// Login a user
// router.post('/auth/login', signInValidation, login);

export default router;
