// controllers/userController.js
import User from '../models/user.js';
import asyncHandler from 'express-async-handler';
import admin from '../config/firebase.js'; 
import mongoose from 'mongoose';


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
   
        password: firebaseUid + new Date().getTime(), 
        name,
        email,

        role: role || 'user', 
     
        firebaseUid: firebaseUid 
    });

    if (newUser) {
        res.status(201).json({
            message: 'Local user account successfully created.',
            user: newUser,
           
        });
    } else {
        res.status(500);
        throw new Error('Failed to create local user account.');
    }
});
export const verifyLogin = async (req, res) => {
  try {
    const { idToken } = req.body;
    if (!idToken)
      return res.status(400).json({ error: "Token is required" });


    // Verify Firebase ID token
    const decoded = await admin.auth().verifyIdToken(idToken);
    const uid = decoded.uid;
    console.log("Token verified, UID:", uid);

    const user = await User.findOne({ firebaseUid: uid });

    if (!user) {
      console.log("User not found, redirecting to registration...");
      return res
        .status(302)
        .json({ redirect: "/register", message: "User not found. Please register first." });
    }

    console.log("✅ User found:", user.email);
    res.status(200).json({ message: "Login verified successfully", user });

  } catch (error) {
    console.error("Error verifying login:", error);
    res.status(401).json({
      error: "Invalid or expired token",
      details: error.message,
    });
  }
};
