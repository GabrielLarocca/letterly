import express from 'express';
import * as paymentController from '../controllers/payment.controller';

const router = express.Router();

// Rotas para processamento de pagamentos
router.post('/create-intent', paymentController.createPaymentIntent);
router.post('/webhook', express.raw({ type: 'application/json' }), paymentController.handleWebhook);

// Rotas para gerenciamento de pagamentos
router.get('/user/:userId/history', paymentController.getPaymentHistory);
router.post('/:paymentId/refund', paymentController.refundPayment);

export default router; 