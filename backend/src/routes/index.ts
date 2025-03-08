import express from 'express';

import userRoutes from './user.routes';
import letterRoutes from './letter.routes';
import planRoutes from './plan.routes';
import photoRoutes from './photo.routes';
import paymentRoutes from './payment.routes';

const router = express.Router();

router.use('/users', userRoutes);
router.use('/letters', letterRoutes);
router.use('/plans', planRoutes);
router.use('/photos', photoRoutes);
router.use('/payments', paymentRoutes);

export default router;
