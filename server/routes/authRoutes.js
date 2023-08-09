import express from 'express';
import { registerUser, loginUser, resetPassword, forgotPassword } from '../controllers/authController.js';
import {authMiddleware} from '../middleware/authMiddleware.js';

const router = express.Router();

// Route for user registration
router.post('/register', registerUser);

// Route for user login
router.post('/login', loginUser);

// Route for resetting the password
router.post('/reset', resetPassword);

// Route for sending forgot password email
router.post('/forgot', forgotPassword);

// Protected route for the user profile
router.get('/profile', authMiddleware, (req, res) => {
  // Access the authenticated user's information using req.user
  const userProfile = req.user;

  // Send the user profile as a response
  res.json({ user: userProfile });
});

export default router;
