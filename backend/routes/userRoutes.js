import express from 'express';
import { registerUser, verifyLogin} from '../controllers/userController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

// ------------------------------------------------------------------
// POST /api/users/register
// Public - After successful Firebase sign-up/in (email or Google)
// Creates a MongoDB user document if it doesn’t already exist
// ------------------------------------------------------------------
router.post('/register', registerUser);

// ------------------------------------------------------------------
// POST /api/users/login
// Public - Client sends Firebase ID token to verify and log in
// This doesn’t create new users; it validates token & returns profile
// ------------------------------------------------------------------
router.post('/login', verifyLogin);


// ------------------------------------------------------------------
// GET /api/users/profile
// Protected - Any logged-in user
// ------------------------------------------------------------------
router.get('/profile', protect, (req, res) => {
  res.json({ message: 'Profile data retrieved.', user: req.user });
});

// ------------------------------------------------------------------
// GET /api/users/kitchen-data
// Protected - Only owner/admin roles
// ------------------------------------------------------------------
router.get(
  '/kitchen-data',
  protect,
  authorize(['owner', 'admin']),
  (req, res) => {
    res.json({
      message: `Access granted for ${req.user.role}.`,
      data: 'Sensitive kitchen orders data.',
    });
  }
);

export default router;
