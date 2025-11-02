import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, Loader2, Clock, ChefHat, Sparkles } from "lucide-react";

export default function LoadingConfirmation() {
  const [confirmed, setConfirmed] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setConfirmed(true), 4000);
    
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) return 100;
        return prev + 2;
      });
    }, 80);

    return () => {
      clearTimeout(timer);
      clearInterval(progressInterval);
    };
  }, []);

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-emerald-50 via-white to-green-100 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-green-200 rounded-full opacity-20"
            initial={{ 
              x: Math.random() * window.innerWidth, 
              y: -20,
              scale: Math.random() * 0.5 + 0.5
            }}
            animate={{ 
              y: window.innerHeight + 20,
              x: Math.random() * window.innerWidth
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
        {!confirmed ? (
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
              
         
              <div className="relative bg-white rounded-full p-6">
                 <img 
        src="/images/logo.png"
        alt="CloudDine Logo" 
        className="h-6 w-6 object-contain"  
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
                Your order is being reviewed by the kitchen. Hang tight — we'll let
                you know once it's confirmed
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