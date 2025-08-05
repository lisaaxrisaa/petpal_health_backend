import express from 'express';
import {
  createVaccine,
  getVaccinesByPetId,
  getVaccineById,
  updateVaccine,
  deleteVaccine,
  getUpcomingVaccines,
} from '../controllers/vaccineController.js';
import { authenticate } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', authenticate, createVaccine);
router.get('/pet/:petId', authenticate, getVaccinesByPetId);
router.get('/pet/:petId/upcoming', authenticate, getUpcomingVaccines);
router.get('/single/:id', authenticate, getVaccineById);
router.patch('/:id', authenticate, updateVaccine);
router.delete('/:id', authenticate, deleteVaccine);

export default router;