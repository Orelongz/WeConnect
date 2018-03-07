import express from 'express';
import {
  createBusiness,
  updateBusiness,
  deleteBusiness,
  getBusiness,
  getAllBusinesses
} from './../controllers/businessController';
import businessValidation from './../middlewares/businessMiddleware';

const router = express.Router();

router.get('/', getAllBusinesses);

router.get('/:businessId', getBusiness);

router.post('/', businessValidation, createBusiness);

router.put('/:businessId', businessValidation, updateBusiness);

router.delete('/:businessId', deleteBusiness);

export default router;
