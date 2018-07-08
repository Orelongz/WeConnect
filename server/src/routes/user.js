import express from 'express';
import UserController from './../controllers/userController';
import validateToken from './../middlewares';
import { uploadUserImage } from './../middlewares/checkFileUpload';

const router = express.Router();
const {
  signup,
  login,
  updateUserDetails,
  getUserDetails,
  verifyAccount,
  contactUs
} = UserController;

router.get('/', (req, res) => res.status(200).json({
  message: 'Welcome to WeConnect'
}));

// Register a user
router.post(
  '/auth/signup',
  signup
);

// Verifies a users account by email
router.put(
  '/auth/verify',
  verifyAccount
);

// To send enquires to admin
router.post(
  '/contactUs',
  contactUs
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
  uploadUserImage,
  updateUserDetails
);

// gets user details
router.get(
  '/user',
  validateToken,
  getUserDetails
);

export default router;
