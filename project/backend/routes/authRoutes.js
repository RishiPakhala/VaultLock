import express from 'express';
import { register, login, deleteAccount } from '../controllers/authController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.delete('/account', authMiddleware, deleteAccount);

export default router;
