

// middleware/authMiddleware.js
import admin from '../config/firebase.js';
import asyncHandler from 'express-async-handler';
import User from '../models/user.js'; // To access the User model for local data/roles

/**
 * @desc Protects routes by verifying Firebase ID Token
 * and fetching/setting local user data (including role).
 */
export const protect = asyncHandler(async (req, res, next) => {
    let idToken;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        try {
            // 1. Get token from header
            idToken = req.headers.authorization.split(' ')[1];

            // 2. Verify token with Firebase
            const decodedToken = await admin.auth().verifyIdToken(idToken);
            const firebaseUid = decodedToken.uid;
            
            // 3. Fetch local user data (Crucial for roles/permissions)
            // We find the user based on their Firebase UID (if you store it) or email.
            // For simplicity, we assume the Firebase user's email is unique and used as the key.
            
            const user = await User.findOne({ email: decodedToken.email }).select('-password');

            if (!user) {
                // If user doesn't exist locally, they must register first 
                // (handled in the 'register' controller below).
                res.status(401);
                throw new Error('User account is not registered in the local database.');
            }

            // 4. Attach user object (local data + Firebase UID) to the request
            req.user = user;
            req.firebaseUid = firebaseUid; // For linking kitchen ownership, etc.

            next();
        } catch (error) {
            console.error('Firebase Auth Error:', error.message);
            res.status(401);
            // Error could be: token expired, invalid signature, or user not found.
            throw new Error('Not authorized. Invalid or expired token.');
        }
    }

    if (!idToken) {
        res.status(401);
        throw new Error('Not authorized. No token provided.');
    }
});


/**
 * @desc Middleware for Role-Based Authorization
 * @param {Array<string>} roles - Array of allowed roles (e.g., ['admin', 'owner'])
 */
export const authorize = (roles = []) => {
    return (req, res, next) => {
        // req.user is populated by the 'protect' middleware
        if (!req.user || !roles.includes(req.user.role)) {
            res.status(403);
            throw new Error(`Not authorized. Required role(s): ${roles.join(', ')}.`);
        }
        next();
    };
};