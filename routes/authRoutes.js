import { Router } from 'express';
import { body } from 'express-validator';
import { register, login, getProfile, updateProfile } from '../controllers/authController.js';
import { protect } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';

const router = Router();

const registerValidation = [
  body('name').notEmpty().withMessage('Name is required').trim().escape(),
  body('email').isEmail().withMessage('Please include a valid email').normalizeEmail(),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
];

const loginValidation = [
  body('email').isEmail().withMessage('Please include a valid email').normalizeEmail(),
  body('password').notEmpty().withMessage('Password is required'),
];

// ==========================================
// TODO: In production, it is highly recommended to add 
// `express-rate-limit` middleware to these authentication routes 
// to prevent brute-force and dictionary attacks.
// Example: router.post('/login', loginLimiter, validate(loginValidation), login);
// ==========================================

router.post('/register', validate(registerValidation), register);
router.post('/login', validate(loginValidation), login);

router.get('/profile', protect, getProfile);
router.put('/profile', protect, updateProfile);

export default router;
