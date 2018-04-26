import express from 'express';
import UserController from './../controllers/userController';
import validateToken from './../middlewares';

const router = express.Router();
const {
  signup,
  login,
  updateUserDetails,
  getUserDetails
} = UserController;

router.get('/', (req, res) => res.status(200).json({
  message: 'Welcome to WeConnect'
}));

// Register a user
router.post(
  '/auth/signup',
  signup
);

// Login a user
router.post(
  '/auth/login',
  login
);

// Edits user details
router.put(
  '/user',
  validateToken,
  updateUserDetails
);

// gets user details
router.get(
  '/user',
  validateToken,
  getUserDetails
);

export default router;
