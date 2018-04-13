import express from 'express';
import CategoryController from './../controllers/categoryController';

const {
  getAllCategories
} = CategoryController;
const router = express.Router();

// Get all business categories
router.get(
  '/',
  getAllCategories
);

export default router;
