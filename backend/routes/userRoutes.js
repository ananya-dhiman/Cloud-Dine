// routes/userRoutes.js
import express from 'express';
import { registerUser } from '../controllers/userController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

// ------------------------------------------------------------------
// Public/Registration Endpoint
// Client calls this after successful Firebase sign-up/in (local or Google)
// to create the MongoDB document.
// ------------------------------------------------------------------
router.post('/register', registerUser); 


// ------------------------------------------------------------------
// Protected Routes (Authentication & Role-Based Authorization)
// ------------------------------------------------------------------

// GET /api/users/profile - Example Protected Route
// Access: Any logged-in user
router.get('/profile', protect, (req, res) => {
    // req.user contains the authenticated local User object
    res.json({ message: 'Profile data retrieved.', user: req.user });
});

// GET /api/users/kitchen-data - Example Owner/Admin Route
// Access: Users with role 'owner' or 'admin'
router.get('/kitchen-data', protect, authorize(['owner', 'admin']), (req, res) => {
    res.json({ message: `Access granted for ${req.user.role}.`, data: 'Sensitive kitchen orders data.' });
});

// GET /api/users/admin-panel - Example Admin-Only Route
// Access: Users with role 'admin'
router.get('/admin-panel', protect, authorize(['admin']), (req, res) => {
    res.json({ message: 'Welcome to the Admin Panel.', data: 'Highest level system controls.' });
});


export default router;