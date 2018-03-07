import express from 'express';
import { createBusiness } from './../controllers/businessController';
import registerBusinessValidation from './../middlewares/businessMiddleware';

const router = express.Router();

router.post('/', registerBusinessValidation, createBusiness);

export default router;
