import express from 'express';
import {
  createFoodEntry,
  getFoodEntriesByPetId,
  getFoodEntryById,
  updateFoodEntry,
  deleteFoodEntry,
} from '../controllers/foodController.js';
import { authenticate } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', authenticate, createFoodEntry);
router.get('/pet/:petId', authenticate, getFoodEntriesByPetId);
router.get('/single/:id', authenticate, getFoodEntryById);
router.patch('/:id', authenticate, updateFoodEntry);
router.delete('/:id', authenticate, deleteFoodEntry);

export default router;