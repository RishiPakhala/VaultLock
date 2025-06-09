import express from 'express';
import {
  addPassword,
  getPasswords,
  updatePassword,
  deletePassword
} from '../controllers/vaultController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(authMiddleware); // Protect all vault routes

router.get('/', getPasswords);
router.post('/', addPassword);
router.put('/:id', updatePassword);
router.delete('/:id', deletePassword);

export default router;
