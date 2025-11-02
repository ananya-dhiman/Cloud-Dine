import React, { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../lib/firebase";
import { useNavigate } from "react-router-dom"; // ✅ import navigate hook

export default function AuthForm() {
  const [loading, setLoading] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const navigate = useNavigate();

  async function onSubmit(e) {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");

    try {
      let userCredential;
      if (isSignup) {
        userCredential = await createUserWithEmailAndPassword(auth, email, password);
      } else {
        userCredential = await signInWithEmailAndPassword(auth, email, password);
      }

      // ✅ Get Firebase ID token
      const idToken = await userCredential.user.getIdToken();
      console.log("Firebase Token:", idToken);
      localStorage.setItem("idToken", idToken); 

      // ✅ Backend endpoint
      const endpoint = isSignup
        ? `${import.meta.env.VITE_API}/users/register`
        : `${import.meta.env.VITE_API}/users/login`;

      const res = await axios.post(endpoint, { idToken });

      console.log("Backend response:", res.data);

      // ✅ On success, navigate to /main
      if (res.status === 200 || res.status === 201) {
        alert(res.data.message || "Success!");
        console.log("Backend response:", res.data);
    
      
      const role = res.data?.user?.role || "user"; 

      if (role === "admin") {
        navigate("/admin");
      } else if (role === "owner") {
        navigate("/owner");
      } else {
        navigate("/main");
      }
      }

    } catch (error) {
      console.error("Auth error:", error);
      alert(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  }

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
          {isSignup ? "Create an Account" : "Welcome Back"}
        </h1>

        <div className="mb-5">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
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
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
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
            onClick={() => setIsSignup(!isSignup)}
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
