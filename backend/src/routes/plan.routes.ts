import express from 'express';
import * as planController from '../controllers/plan.controller';

const router = express.Router();

router.get('/', planController.getPlans);
router.get('/:id', planController.getPlan);
router.post('/', planController.createPlan);
router.put('/:id', planController.updatePlan);
router.delete('/:id', planController.deletePlan);

export default router; 