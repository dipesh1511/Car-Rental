// backend/routes/paymentRoutes.js
import express from 'express';
import { createOrder, getRazorpayKey, verifyPayment } from '../controllers/paymentController.js';
import { protect } from '../middleware/auth.js';

const paymentRouter = express.Router();

paymentRouter.post('/create-order', createOrder);

paymentRouter.get('/get-key', getRazorpayKey);

paymentRouter.post('/verify', protect, verifyPayment);

export default paymentRouter;
