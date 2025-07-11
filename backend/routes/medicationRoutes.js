import express from 'express';

import {
  createMedication,
  getMedicationsByPetId,
  getMedicationById,
  updateMedication,
  deleteMedication,
} from '../controllers/medicationController.js';
import { authenticate } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', authenticate, createMedication);
router.get('/:petId', authenticate, getMedicationsByPetId);
router.get('/log/:id', authenticate, getMedicationById);
router.patch('/:id', authenticate, updateMedication);
router.delete('/:id', authenticate, deleteMedication);

export default router;
