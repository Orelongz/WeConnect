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

router.post('/auth/signup', signUpValidation, validateEmail, signup);

router.post('/auth/login', signInValidation, login);

export default router;
