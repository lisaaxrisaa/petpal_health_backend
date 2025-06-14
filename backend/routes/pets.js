import express from 'express';
import {
  createPet,
  getUserPets,
  updatePet,
  deletePet,
} from '../controllers/petController.js';
import { authenticate } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', authenticate, getUserPets);
router.post('/', authenticate, createPet);
router.put('/:id', authenticate, updatePet);
router.delete('/:id', authenticate, deletePet);

export default router;
