import React, { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../lib/firebase";
import { useNavigate, useLocation } from "react-router-dom";

export default function AuthForm() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // 🔹 Derive mode and role from URL
  const path = location.pathname.toLowerCase();
  const isSignup = path.includes("signup");
  const role = path.includes("owner") ? "owner" : "user";

  // 🔹 Submit handler
  async function onSubmit(e) {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");

    try {
      let userCredential;

      // 1️⃣ Firebase auth (signup or login)
      if (isSignup) {
        userCredential = await createUserWithEmailAndPassword(auth, email, password);
      } else {
        userCredential = await signInWithEmailAndPassword(auth, email, password);
      }

      // 2️⃣ Get Firebase ID token
      const idToken = await userCredential.user.getIdToken();
      localStorage.setItem("idToken", idToken);

      // 3️⃣ Backend endpoints
      const API = import.meta.env.VITE_API;
      const loginEndpoint = `${API}/users/login`;
      const registerEndpoint = `${API}/users/register`;

      let res;
      try {
        // Try verifying local user first
        res = await axios.post(loginEndpoint, { idToken });
      } catch (err) {
        // If local user doesn't exist, create it automatically
        if (
          err.response?.status === 302 ||
          err.response?.data?.redirect === "/register" ||
          err.response?.data?.needsRegistration
        ) {
          console.log("User not found locally — registering...");
          res = await axios.post(registerEndpoint, {
            idToken,
            name: email.split("@")[0],
            role,
          });
        } else {
          throw err; // Re-throw unexpected errors
        }
      }

      console.log("Backend response:", res.data);

      // 4️⃣ On success — navigate by role
      alert(res.data.message || "Success!");
      const userRole = res.data?.user?.role || role;

      if (userRole === "admin") navigate("/admin");
      else if (userRole === "owner") navigate("/owner");
      else navigate("/main");

    } catch (error) {
      console.error("Auth error:", error);
      alert(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  }

  // 🔹 UI
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col items-center justify-center min-h-screen bg-white text-gray-800 px-4"
    >
      <form
        onSubmit={onSubmit}
        className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-gray-200"
      >
        <h1 className="text-3xl font-bold mb-6 text-center text-green-700">
          {isSignup
            ? `Create a ${role === "owner" ? "Kitchen Owner" : "User"} Account`
            : `Welcome Back, ${role === "owner" ? "Chef" : "User"}`}
        </h1>

        <div className="mb-5">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Email Address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="you@example.com"
            required
            className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="••••••••"
            required
            className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 rounded-lg bg-green-600 text-white font-semibold hover:bg-green-700 transition-colors disabled:opacity-60"
        >
          {loading
            ? isSignup
              ? "Creating Account..."
              : "Signing In..."
            : isSignup
            ? "Sign Up"
            : "Login"}
        </button>

        <p className="text-sm text-center mt-6 text-gray-600">
          {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
          <button
            type="button"
            onClick={() =>
              navigate(isSignup ? `/${role}/login` : `/${role}/signup`)
            }
            className="text-green-600 font-medium hover:underline"
          >
            {isSignup ? "Login" : "Sign Up"}
          </button>
        </p>
      </form>

      <p className="mt-8 text-xs text-gray-400">
        © {new Date().getFullYear()} Cloud Dine. All rights reserved.
      </p>
    </motion.div>
  );
}
