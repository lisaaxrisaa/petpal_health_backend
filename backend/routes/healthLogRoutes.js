import express from 'express';
import {
  createHealthLog,
  getHealthLogsByPetId,
  updateHealthLog,
  deleteHealthLog,
} from '../controllers/healthLogController.js';
import { authenticate } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', authenticate, createHealthLog);
router.get('/:petId', authenticate, getHealthLogsByPetId);
router.patch('/:id', authenticate, updateHealthLog);
router.delete('/:id', authenticate, deleteHealthLog);

export default router;
