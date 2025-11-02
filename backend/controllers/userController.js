// controllers/userController.js
import User from '../models/user.js';
import asyncHandler from 'express-async-handler';
import admin from '../config/firebase.js'; 
import mongoose from 'mongoose';

/**
 * @desc Creates a new local user entry after successful Firebase sign-up/in.
 * The client should send the Firebase ID token and the desired role.
 * @route POST /api/users/register
 * @access Private (Client must have a valid Firebase token)
 */
export const registerUser = asyncHandler(async (req, res) => {
    const { idToken, name, role } = req.body;
    
    if (!idToken || !name) {
        res.status(400);
        throw new Error('Missing ID token or name.');
    }

    // 1. Verify the client-provided Firebase ID Token
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    const { email, uid: firebaseUid } = decodedToken;

    // 2. Check if user already exists in local DB
    const userExists = await User.findOne({ email });

    if (userExists) {
        // If user already exists, just return their data (login flow)
        return res.status(200).json({ 
            message: 'User already registered locally.', 
            user: userExists 
        });
    }

    // 3. Create User in Local MongoDB
    const newUser = await User.create({
        // We use a placeholder password as Firebase handles auth, but schema requires it.
        // It should be a unique placeholder (e.g., the Firebase UID).
        // NOTE: The 'pre save' hook in user.js will hash this.
        password: firebaseUid + new Date().getTime(), 
        name,
        email,
        // Ensure role is valid and handle 'admin' role carefully
        role: role || 'user', 
        // Optional: Store the Firebase UID for cross-referencing
        firebaseUid: firebaseUid 
    });

    if (newUser) {
        res.status(201).json({
            message: 'Local user account successfully created.',
            user: newUser,
            // NO JWT IS SENT HERE. The Firebase token is the source of truth.
        });
    } else {
        res.status(500);
        throw new Error('Failed to create local user account.');
    }
});

export const verifyLogin = async (req, res) => {
  try {
    const { idToken } = req.body;
    if (!idToken) return res.status(400).json({ error: 'Token is required' });

    // Verify Firebase ID token
    const decoded = await admin.auth().verifyIdToken(token);
    const uid = decoded.uid;

    const user = await User.findOne({ uid });
    if (!user) return res.status(404).json({ error: 'User not found in database' });

    res.status(200).json({ message: 'Login verified successfully', user });
  } catch (error) {
    res.status(401).json({ error: 'Invalid or expired token', details: error.message });
  }
};

