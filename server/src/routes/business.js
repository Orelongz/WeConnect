import express from 'express';
// import multer from 'multer';
import BusinessController from './../controllers/businessController';
import validateToken from './../middlewares';

const {
  createBusiness,
  updateBusiness,
  deleteBusiness,
  getBusiness,
  getAllBusinesses,
  changeBusinessOwnership,
  getUserBusinesses
} = BusinessController;
const router = express.Router();

// const storage = multer.diskStorage({
//   destination: './client/public/uploads',
//   filename: (req, file, cb) => {
//     cb(null, `${file.fieldname}-${Date.now()}`);
//   }
// });

// const upload = multer({
//   storage,
//   limits: { fileSize: 1000000 },

// }).single('weConnect-image');


// Get all businesses
router.get('/', getAllBusinesses);

// Route to get all user businesses
router.get(
  '/user',
  validateToken,
  getUserBusinesses
);

// Route to transfer business ownership
router.put(
  '/change-ownership/:businessId',
  validateToken,
  changeBusinessOwnership
);

// Get a business by businessId
router.get(
  '/:businessId',
  getBusiness
);

// Register a business
router.post(
  '/',
  validateToken,
  createBusiness
);

// Update a business
router.put(
  '/:businessId',
  validateToken,
  updateBusiness
);

// Remove a business
router.delete(
  '/:businessId',
  validateToken,
  deleteBusiness
);

export default router;
