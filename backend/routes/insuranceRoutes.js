import express from 'express';
import {
  createInsurance,
  getInsuranceByPetId,
  getInsuranceById,
  updateInsurance,
  deleteInsurance,
} from '../controllers/insuranceController.js';
import { authenticate } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', authenticate, createInsurance);
router.get('/pet/:petId', authenticate, getInsuranceByPetId);
router.get('/single/:id', authenticate, getInsuranceById);
router.patch('/:id', authenticate, updateInsurance);
router.delete('/:id', authenticate, deleteInsurance);

export default router;