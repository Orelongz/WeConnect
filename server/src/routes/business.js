import express from 'express';
import businessController from './../controllers/businessController';
import businessMiddleware from './../middlewares/businessMiddleware';

const { createBusiness } = businessController;
const { businessValidation } = businessMiddleware;
const router = express.Router();

// Get all businesses
// router.get('/', getAllBusinesses);

// Get a business by businessId
// router.get('/:businessId', getBusiness);

// Register a business
router.post('/', businessValidation, createBusiness);

// Update a business
// router.put('/:businessId', businessValidation, updateBusiness);

// Remove a business
// router.delete('/:businessId', deleteBusiness);

export default router;
