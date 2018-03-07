import express from 'express';
import { createBusiness, updateBusiness, deleteBusiness } from './../controllers/businessController';
import businessValidation from './../middlewares/businessMiddleware';

const router = express.Router();

router.post('/', businessValidation, createBusiness);

router.put('/:businessId', businessValidation, updateBusiness);

router.delete('/:businessId', deleteBusiness);

export default router;
