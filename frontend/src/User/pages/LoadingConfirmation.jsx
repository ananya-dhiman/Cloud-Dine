
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, Loader2, Clock, ChefHat, Sparkles, XCircle } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export default function LoadingConfirmation() {
  const [confirmed, setConfirmed] = useState(false);
  const [rejected, setRejected] = useState(false);
  const [rejectionNote, setRejectionNote] = useState("");
  const [progress, setProgress] = useState(0);
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // First useEffect: Fetch user profile and set userId
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("idToken");
        if (!token) {
          console.error("No token found");
          navigate("/login");
          return;
        }

        const profileRes = await axios.get(
          `${import.meta.env.VITE_API}/users/profile`,
          {
            headers: { Authorization: `Bearer ${token}` }
          }
        );
        
        console.log("profileRes", profileRes);
        const getUserId = profileRes.data?.user?._id;
        
        console.log("getUserId", getUserId);

        if (!getUserId) {
          console.error("User ID not found in /profile response");
          navigate("/");
          return;
        }

        setUserId(getUserId);
      } catch (error) {
        console.error("Error fetching user profile:", error);
        navigate("/");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  // Second useEffect: Poll for order status - only runs when userId is available
  useEffect(() => {
    // Don't start polling until we have a userId
    if (!userId) {
      console.log("Waiting for userId before polling...");
      return;
    }

    console.log("Starting order status polling for user:", userId);

    // Polling function
    const checkOrderStatus = async () => {
      try {
        console.log("Checking order status for userId:", userId);
        
        const response = await fetch(
          `${import.meta.env.VITE_API}/orders/user/${userId}`,
          {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('idToken')}`,
              'Content-Type': 'application/json'
            }
          }
        );
        
        // Check if response is actually JSON
        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
          console.error('Server returned non-JSON response:', response.status, response.statusText);
          return;
        }
        
        if (response.ok) {
          const orders = await response.json();
          
          console.log("Received orders:", orders);
          
          // Handle empty orders array
          if (!orders || orders.length === 0) {
            console.log('No orders found yet');
            return;
          }
          
          // Get the most recent order
         const latestOrder = [...orders].sort(
  (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
)[0];

          
          if (latestOrder && latestOrder.status && latestOrder.status.length > 0) {
            const currentStatus = latestOrder.status[latestOrder.status.length - 1];
            
            console.log("Current order status:", currentStatus);
            
            if (currentStatus.boolStatus === true) {
              // Order accepted
              console.log("Order accepted!");
              setConfirmed(true);
              setProgress(100);
              // Navigate to payment after showing success
              setTimeout(() => {
                navigate('/payment', { state: { orderId: latestOrder._id } });
              }, 2500);
            } else if (currentStatus.boolStatus === false) {
              // Order rejected
              console.log("Order rejected:", currentStatus.rejectionNote);
              setRejected(true);
              setRejectionNote(currentStatus.rejectionNote || "Sorry for the inconvenience");
              // Navigate back to main after showing rejection
              setTimeout(() => {
                navigate('/main');
              }, 4000);
            }
          }
        } else {
          console.error('API Error:', response.status, response.statusText);
        }
      } catch (error) {
        console.error('Error polling order status:', error.message);
        // Don't show error to user, just log it and continue polling
      }
    };

    // Initial check
    checkOrderStatus();

    // Poll every 10 seconds
    const pollingInterval = setInterval(checkOrderStatus, 10000);
    
    // Progress bar animation
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 95) return 95; // Cap at 95% until confirmed
        return prev + 1;
      });
    }, 200);

    return () => {
      clearInterval(pollingInterval);
      clearInterval(progressInterval);
    };
  }, [userId, navigate]); // This useEffect depends on userId

  // Show loading state while fetching userId
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-emerald-50 via-white to-green-100">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-green-500 mx-auto mb-4" />
          <p className="text-gray-600">Setting up...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-emerald-50 via-white to-green-100 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-green-200 rounded-full opacity-20"
            initial={{ 
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000), 
              y: -20,
              scale: Math.random() * 0.5 + 0.5
            }}
            animate={{ 
              y: (typeof window !== 'undefined' ? window.innerHeight : 1000) + 20,
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000)
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: "linear",
              delay: Math.random() * 5
            }}
          />
        ))}
      </div>

      <AnimatePresence mode="wait">
        {!confirmed && !rejected ? (
          <motion.div
            key="waiting"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.5 }}
            className="relative z-10 flex flex-col items-center space-y-8 px-4"
          >
            {/* Animated icon container */}
            <div className="relative">
              {/* Outer pulsing circles */}
              <motion.div
                className="absolute inset-0 rounded-full bg-green-400 opacity-20"
                animate={{ scale: [1, 1.5, 1], opacity: [0.2, 0, 0.2] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <motion.div
                className="absolute inset-0 rounded-full bg-green-400 opacity-20"
                animate={{ scale: [1, 1.5, 1], opacity: [0.2, 0, 0.2] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
              />
              
        
              <div className="relative bg-white rounded-full p-12 shadow-2xl">
                <img 
                  src="/images/logo.png"
                  alt="CloudDine Logo" 
                  className="h-20 w-20 object-contain"  
                />
              </div>

              {/* Orbiting sparkles */}
              {[0, 120, 240].map((angle, i) => (
                <motion.div
                  key={i}
                  className="absolute top-1/2 left-1/2"
                  style={{ originX: 0.5, originY: 0.5 }}
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "linear",
                    delay: i * 0.3
                  }}
                >
                  <motion.div
                    style={{
                      x: Math.cos((angle * Math.PI) / 180) * 80 - 12,
                      y: Math.sin((angle * Math.PI) / 180) * 80 - 12
                    }}
                    animate={{ scale: [1, 1.3, 1] }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      delay: i * 0.2
                    }}
                  >
                    <Sparkles size={24} className="text-green-400" />
                  </motion.div>
                </motion.div>
              ))}
            </div>

            {/* Text content */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-center space-y-3"
            >
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
                Waiting for Confirmation
              </h1>
              <p className="text-gray-600 text-lg max-w-md">
                Your order is being reviewed by the kitchen. This might take a few seconds — please don't close this window
              </p>
            </motion.div>

            {/* Progress indicator */}
            <div className="w-full max-w-md space-y-3">
              <div className="flex items-center justify-between text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <Clock size={16} />
                  <span>Processing</span>
                </div>
                <span>{progress}%</span>
              </div>
              
              <div className="relative h-3 bg-green-100 rounded-full overflow-hidden shadow-inner">
                <motion.div
                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-green-400 to-green-500 rounded-full"
                  initial={{ width: "0%" }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.3 }}
                />
                
                {/* Shimmer effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30"
                  animate={{ x: ["-100%", "200%"] }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />
              </div>
            </div>

            {/* Status dots */}
            <div className="flex gap-2">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="w-2 h-2 bg-green-500 rounded-full"
                  animate={{ 
                    scale: [1, 1.5, 1],
                    opacity: [0.3, 1, 0.3]
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: i * 0.2
                  }}
                />
              ))}
            </div>
          </motion.div>
        ) : rejected ? (
          <motion.div
            key="rejected"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, type: "spring", bounce: 0.4 }}
            className="relative z-10 flex flex-col items-center space-y-6 px-4"
          >
            {/* Rejection animation */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ 
                delay: 0.2,
                type: "spring",
                stiffness: 200,
                damping: 15
              }}
            >
              <motion.div
                animate={{ rotate: [0, -10, 10, 0] }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <XCircle size={120} className="text-red-500 drop-shadow-lg" strokeWidth={2} />
              </motion.div>
            </motion.div>

            {/* Rejection text */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-center space-y-4 max-w-lg"
            >
              <motion.h1 
                className="text-4xl md:text-5xl font-bold text-red-600"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                Order Not Accepted
              </motion.h1>
              <motion.div
                className="bg-red-50 border border-red-200 rounded-lg p-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <p className="text-red-800 font-medium mb-2">
                  {rejectionNote}
                </p>
                <p className="text-gray-600">
                  Sorry for the inconvenience. You'll be redirected to the main page shortly.
                </p>
              </motion.div>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            key="confirmed"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, type: "spring", bounce: 0.4 }}
            className="relative z-10 flex flex-col items-center space-y-6 px-4"
          >
            {/* Success animation */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ 
                delay: 0.2,
                type: "spring",
                stiffness: 200,
                damping: 15
              }}
            >
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <CheckCircle size={120} className="text-green-500 drop-shadow-lg" strokeWidth={2} />
              </motion.div>
            </motion.div>

            {/* Success text */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-center space-y-4"
            >
              <motion.h1 
                className="text-4xl md:text-5xl font-bold text-green-600"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                Order Confirmed
              </motion.h1>
              <motion.p 
                className="text-gray-600 text-lg max-w-md"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                Your delicious meal is being prepared. You'll receive updates soon
              </motion.p>
            </motion.div>

            {/* Confetti effect */}
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(30)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-3 h-3 rounded-full"
                  style={{
                    background: `hsl(${Math.random() * 120 + 80}, 70%, 60%)`,
                    left: `${50}%`,
                    top: `${40}%`
                  }}
                  initial={{ scale: 0, x: 0, y: 0 }}
                  animate={{
                    scale: [0, 1, 0.5],
                    x: (Math.random() - 0.5) * 400,
                    y: Math.random() * 300 + 100,
                    rotate: Math.random() * 360
                  }}
                  transition={{
                    duration: 1.5,
                    delay: i * 0.02,
                    ease: "easeOut"
                  }}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}