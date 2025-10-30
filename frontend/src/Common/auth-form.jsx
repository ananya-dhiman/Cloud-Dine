
// import { useState } from "react";
// import { motion } from "framer-motion";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Link, useNavigate } from "react-router-dom"; // Add useNavigate

// export default function AuthForm({ mode = "login", role = "user" }) {
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate(); // initialize navigate
//   const isSignup = mode === "signup";
//   const roleLabel = role === "owner" ? "Kitchen Owner" : "User";
//   const oppositeMode = isSignup ? "login" : "signup";
//   const oppositeHref = role === "owner" ? `/owner/${oppositeMode}` : `/user/${oppositeMode}`;

//   async function onSubmit(e) {
//     e.preventDefault();
//     setLoading(true);
//     const formData = new FormData(e.currentTarget);
//     const payload = Object.fromEntries(formData.entries());
//     await new Promise((r) => setTimeout(r, 700));
//     console.log("[v0] Auth submission", { mode, role, payload });
//     setLoading(false);
//     alert(`${isSignup ? "Signed up" : "Logged in"} as ${roleLabel}!`);

//     // Navigate based on role
//     if (role === "owner") {
//       navigate("/owner");
//     } else {
//       navigate("/");
//     }
//   }

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 12 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.35 }}
//       className="w-full max-w-md mx-auto"
//     >
//       <header className="mb-6 text-center">
//         <h1 className="text-3xl font-semibold text-balance">
//           {isSignup ? "Create your account" : "Welcome back"}
//         </h1>
//         <p className="text-sm text-muted-foreground">
//           {roleLabel} {isSignup ? "Sign Up" : "Login"}
//         </p>
//       </header>

//       <form
//         onSubmit={onSubmit}
//         className="grid gap-4 bg-card text-card-foreground p-6 rounded-lg border"
//       >
//         {isSignup && (
//           <div className="grid gap-2">
//             <Label htmlFor="name">Full Name</Label>
//             <Input id="name" name="name" placeholder="e.g. Priya Sharma" required />
//           </div>
//         )}
//         <div className="grid gap-2">
//           <Label htmlFor="email">Email</Label>
//           <Input id="email" name="email" type="email" placeholder="you@example.com" required />
//         </div>
//         <div className="grid gap-2">
//           <Label htmlFor="password">Password</Label>
//           <Input id="password" name="password" type="password" placeholder="••••••••" required />
//         </div>

//         <Button type="submit" disabled={loading} className="mt-2 bg-primary text-primary-foreground hover:opacity-90">
//           {loading ? (isSignup ? "Creating..." : "Signing in...") : isSignup ? "Sign Up" : "Login"}
//         </Button>

//         <p className="text-xs text-center text-muted-foreground">
//           {isSignup ? "Already have an account? " : "Don't have an account? "}
//           <Link to={oppositeHref} className="text-primary underline underline-offset-4">
//             {isSignup ? "Login" : "Sign Up"}
//           </Link>
//         </p>
//       </form>

//       <div className="text-center mt-4">
//         <Link to="/" className="text-sm text-primary underline underline-offset-4" aria-label="Back to role selection">
//           ← Back to role selection
//         </Link>
//       </div>
//     </motion.div>
//   );
// }
import React, { useState } from "react";
import { motion } from "framer-motion";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { initializeApp } from "firebase/app";


// Initialize Firebase once
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default function AuthForm() {
  const [loading, setLoading] = useState(false);
  const [isSignup, setIsSignup] = useState(false);

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

      const token = await userCredential.user.getIdToken();
      console.log("✅ Firebase Token:", token);
      alert("Success! Token logged in console.");
    } catch (error) {
      console.error("❌ Auth error:", error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col items-center justify-center min-h-screen bg-gray-950 text-white"
    >
      <form
        onSubmit={onSubmit}
        className="bg-gray-900 p-8 rounded-xl shadow-lg w-full max-w-sm border border-gray-800"
      >
        <h1 className="text-2xl font-bold mb-6 text-center">
          {isSignup ? "Sign Up" : "Login"}
        </h1>

        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium mb-2">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="you@example.com"
            required
            className="w-full p-2 rounded bg-gray-800 border border-gray-700 text-white"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="password" className="block text-sm font-medium mb-2">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="••••••••"
            required
            className="w-full p-2 rounded bg-gray-800 border border-gray-700 text-white"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 rounded bg-green-600 hover:bg-green-700 disabled:opacity-60"
        >
          {loading ? (isSignup ? "Creating..." : "Signing in...") : isSignup ? "Sign Up" : "Login"}
        </button>

        <p className="text-sm text-center mt-4">
          {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
          <button
            type="button"
            onClick={() => setIsSignup(!isSignup)}
            className="text-green-400 hover:underline"
          >
            {isSignup ? "Login" : "Sign Up"}
          </button>
        </p>
      </form>
    </motion.div>
  );
}
