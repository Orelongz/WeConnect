import express from 'express';
import { createBusiness, updateBusiness } from './../controllers/businessController';
import businessValidation from './../middlewares/businessMiddleware';

const router = express.Router();

router.post('/', businessValidation, createBusiness);

router.put('/:businessId', businessValidation, updateBusiness);

export default router;
