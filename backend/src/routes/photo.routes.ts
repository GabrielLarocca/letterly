import express from 'express';
import * as photoController from '../controllers/photo.controller';

const router = express.Router();

router.get('/letter/:letterId', photoController.getPhotos);
router.get('/:id', photoController.getPhoto);
router.post('/letter/:letterId', photoController.createPhoto);
router.put('/:id', photoController.updatePhoto);
router.delete('/:id', photoController.deletePhoto);
router.post('/reorder', photoController.reorderPhotos);

export default router; 