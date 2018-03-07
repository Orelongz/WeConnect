import express from 'express';
import {
  createBusiness,
  updateBusiness,
  deleteBusiness,
  getBusiness
} from './../controllers/businessController';
import businessValidation from './../middlewares/businessMiddleware';

const router = express.Router();

router.post('/', businessValidation, createBusiness);

router.put('/:businessId', businessValidation, updateBusiness);

router.delete('/:businessId', deleteBusiness);

router.get('/:businessId', getBusiness);

export default router;
