// import { useEffect, useState } from 'react';
// import { CheckCircle, Clock, ChefHat, Flame, Bike } from 'lucide-react';
// import { Button } from '@/components/ui/button';
// import { useNavigate } from 'react-router-dom';

// export const OrderPlaced = () => {
//   const navigate = useNavigate();
//   const [step, setStep] = useState(0);

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setStep((prev) => (prev < 4 ? prev + 1 : prev));
//     }, 2000);
//     return () => clearInterval(timer);
//   }, []);

//   const steps = [
//     { icon: CheckCircle, label: 'Order Confirmed', color: 'text-green-500' },
//     { icon: ChefHat, label: 'Preparing Food', color: 'text-orange-500' },
//     { icon: Flame, label: 'Cooking', color: 'text-red-500' },
//     { icon: Clock, label: 'Packed & Ready', color: 'text-yellow-500' },
//     { icon: Bike, label: 'Out for Delivery', color: 'text-blue-500' },
//   ];

//   return (
//     <main className="min-h-screen bg-gradient-to-b from-orange-50 via-yellow-50 to-background flex items-center justify-center p-4">
//       <div className="max-w-2xl w-full space-y-8 animate-fade-in">
     
//         <div className="text-center space-y-4">
//           <div className="relative inline-block">
//             <div className="absolute inset-0 animate-pulse bg-green-500/20 rounded-full blur-2xl"></div>
//             <CheckCircle className="w-24 h-24 text-green-500 animate-scale-in relative z-10" strokeWidth={1.5} />
//           </div>
//           <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">Order Placed Successfully!</h1>
//           <p className="text-lg text-muted-foreground">
//             Your delicious meal is being prepared with love 🍲
//           </p>
//         </div>

//         {/* 🧾 Order Details */}
//         <div className="bg-card rounded-xl border shadow-carousel p-6 space-y-6">
//           <div className="space-y-2">
//             <div className="flex justify-between items-center">
//               <span className="text-sm text-muted-foreground">Order Number</span>
//               <span className="font-mono font-semibold">#KK-{Math.floor(Math.random() * 10000)}</span>
//             </div>
//             <div className="flex justify-between items-center">
//               <span className="text-sm text-muted-foreground">Restaurant</span>
//               <span className="font-semibold">The Curry Kitchen</span>
//             </div>
//             <div className="flex justify-between items-center">
//               <span className="text-sm text-muted-foreground">Amount</span>
//               <span className="font-semibold text-green-600">₹{(Math.random() * 500 + 200).toFixed(2)}</span>
//             </div>
//             <div className="flex justify-between items-center">
//               <span className="text-sm text-muted-foreground">Estimated Delivery</span>
//               <span className="font-semibold">25–30 mins</span>
//             </div>
//           </div>

//           {/*Progress Steps */}
//           <div className="space-y-4 pt-4 border-t">
//             {steps.map((item, index) => {
//               const Icon = item.icon;
//               const isActive = step >= index;
//               const isCurrent = step === index;

//               return (
//                 <div
//                   key={index}
//                   className={`flex items-center gap-4 transition-all duration-500 ${
//                     isActive ? 'opacity-100' : 'opacity-50'
//                   }`}
//                 >
//                   <div
//                     className={`relative flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all duration-500 ${
//                       isActive ? 'border-primary bg-primary/10' : 'border-muted bg-muted'
//                     }`}
//                   >
//                     <Icon
//                       className={`w-6 h-6 transition-all duration-500 ${
//                         isCurrent ? `${item.color} animate-pulse` : isActive ? item.color : 'text-muted-foreground'
//                       }`}
//                     />
//                     {isCurrent && (
//                       <div className="absolute inset-0 rounded-full border-2 border-primary animate-ping"></div>
//                     )}
//                   </div>
//                   <div className="flex-1">
//                     <p className={`font-medium ${isActive ? 'text-foreground' : 'text-muted-foreground'}`}>
//                       {item.label}
//                     </p>
//                   </div>
//                   {isActive && index < step && (
//                     <CheckCircle className="w-5 h-5 text-green-500 animate-scale-in" />
//                   )}
//                 </div>
//               );
//             })}
//           </div>

//           {/* Cooking Animation */}
//           <div className="pt-4 border-t">
//             <div className="relative h-32 flex items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-orange-500/10 to-red-500/10">
//               <div className="absolute inset-0 flex items-end justify-center">
//                 {[...Array(5)].map((_, i) => (
//                   <div
//                     key={i}
//                     className="w-2 bg-gradient-to-t from-orange-500 to-yellow-500 rounded-t-full animate-pulse opacity-60"
//                     style={{
//                       height: `${Math.random() * 40 + 20}%`,
//                       animationDelay: `${i * 0.2}s`,
//                       marginLeft: i > 0 ? '8px' : '0',
//                     }}
//                   ></div>
//                 ))}
//               </div>
//               <ChefHat className="w-16 h-16 text-primary relative z-10 animate-bounce" />
//             </div>
//             <p className="text-center text-sm text-muted-foreground mt-2">
//               Our chefs are preparing your food with fresh Indian spices 🌶️
//             </p>
//           </div>
//         </div>

//         {/* Action Buttons */}
//         <div className="flex gap-3 justify-center">
//           <Button variant="outline" onClick={() => navigate('/restaurants')}>
//             Back to Restaurants
//           </Button>
//           <Button onClick={() => navigate('/track-order')}>Track My Order</Button>
//         </div>
//       </div>
//     </main>
//   );
// };

// export default OrderPlaced;
// import { useEffect, useState } from "react";
// import { CheckCircle, Clock, ChefHat, Flame, Bike } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { useNavigate } from "react-router-dom";
// import { useCart } from "../context/cartContext.jsx"; 

// export const OrderPlaced = () => {
//   const navigate = useNavigate();
//   const { cartItems = [], clearCart } = useCart(); // give it a default value
// const [step, setStep] = useState(0);

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setStep((prev) => (prev < 4 ? prev + 1 : prev));
//     }, 2000);
//     return () => clearInterval(timer);
//   }, []);

//   // Calculate total amount
//  const totalAmount = (cartItems || []).reduce(
//   (acc, item) => acc + parseFloat(item.price || 0) * (item.quantity || 1),
//   0
// );

// const restaurantName = cartItems?.[0]?.kitchen || "Unknown Kitchen";

//   const steps = [
//     { icon: CheckCircle, label: "Order Confirmed", color: "text-green-500" },
//     { icon: ChefHat, label: "Preparing Food", color: "text-orange-500" },
//     { icon: Flame, label: "Cooking", color: "text-red-500" },
//     { icon: Clock, label: "Packed & Ready", color: "text-yellow-500" },
//     { icon: Bike, label: "Out for Delivery", color: "text-blue-500" },
//   ];

  
//   useEffect(() => {
//     if (cartItems.length > 0) {
//       const timeout = setTimeout(() => clearCart(), 8000);
//       return () => clearTimeout(timeout);
//     }
//   }, [cartItems, clearCart]);

//   return (
//     <main className="min-h-screen bg-gradient-to-b from-orange-50 via-yellow-50 to-background flex items-center justify-center p-4">
//       <div className="max-w-2xl w-full space-y-8 animate-fade-in">
//         <div className="text-center space-y-4">
//           <div className="relative inline-block">
//             <div className="absolute inset-0 animate-pulse bg-green-500/20 rounded-full blur-2xl"></div>
//             <CheckCircle className="w-24 h-24 text-green-500 animate-scale-in relative z-10" strokeWidth={1.5} />
//           </div>
//           <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
//             Order Placed Successfully!
//           </h1>
//           <p className="text-lg text-muted-foreground">
//             Your delicious meal is being prepared with love 🍲
//           </p>
//         </div>

//         {/* Order Details */}
//         <div className="bg-card rounded-xl border shadow-carousel p-6 space-y-6">
//           <div className="space-y-2">
//             <div className="flex justify-between items-center">
//               <span className="text-sm text-muted-foreground">Order Number</span>
//               <span className="font-mono font-semibold">
//                 #KK-{Math.floor(Math.random() * 10000)}
//               </span>
//             </div>
//             <div className="flex justify-between items-center">
//               <span className="text-sm text-muted-foreground">Restaurant</span>
//               <span className="font-semibold">{restaurantName}</span>
//             </div>
//             <div className="flex justify-between items-center">
//               <span className="text-sm text-muted-foreground">Amount</span>
//               <span className="font-semibold text-green-600">
//                 ₹{totalAmount.toFixed(2)}
//               </span>
//             </div>
//             <div className="flex justify-between items-center">
//               <span className="text-sm text-muted-foreground">Estimated Delivery</span>
//               <span className="font-semibold">25–30 mins</span>
//             </div>
//           </div>

//           {/* Show ordered items */}
//           <div className="border-t pt-4 space-y-2">
//             <p className="font-semibold text-sm">Items Ordered:</p>
//             {cartItems.map((item, index) => (
//               <div key={index} className="flex justify-between text-sm">
//                 <span>
//                   {item.name} × {item.quantity}
//                 </span>
//                 <span>₹{(item.price * item.quantity).toFixed(2)}</span>
//               </div>
//             ))}
//           </div>

//           {/* Progress Steps */}
//           <div className="space-y-4 pt-4 border-t">
//             {steps.map((item, index) => {
//               const Icon = item.icon;
//               const isActive = step >= index;
//               const isCurrent = step === index;

//               return (
//                 <div
//                   key={index}
//                   className={`flex items-center gap-4 transition-all duration-500 ${
//                     isActive ? "opacity-100" : "opacity-50"
//                   }`}
//                 >
//                   <div
//                     className={`relative flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all duration-500 ${
//                       isActive ? "border-primary bg-primary/10" : "border-muted bg-muted"
//                     }`}
//                   >
//                     <Icon
//                       className={`w-6 h-6 transition-all duration-500 ${
//                         isCurrent
//                           ? `${item.color} animate-pulse`
//                           : isActive
//                           ? item.color
//                           : "text-muted-foreground"
//                       }`}
//                     />
//                     {isCurrent && (
//                       <div className="absolute inset-0 rounded-full border-2 border-primary animate-ping"></div>
//                     )}
//                   </div>
//                   <p
//                     className={`font-medium ${
//                       isActive ? "text-foreground" : "text-muted-foreground"
//                     }`}
//                   >
//                     {item.label}
//                   </p>
//                   {isActive && index < step && (
//                     <CheckCircle className="w-5 h-5 text-green-500 animate-scale-in" />
//                   )}
//                 </div>
//               );
//             })}
//           </div>

//           {/* Cooking Animation */}
//           <div className="pt-4 border-t">
//             <div className="relative h-32 flex items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-orange-500/10 to-red-500/10">
//               <div className="absolute inset-0 flex items-end justify-center">
//                 {[...Array(5)].map((_, i) => (
//                   <div
//                     key={i}
//                     className="w-2 bg-gradient-to-t from-orange-500 to-yellow-500 rounded-t-full animate-pulse opacity-60"
//                     style={{
//                       height: `${Math.random() * 40 + 20}%`,
//                       animationDelay: `${i * 0.2}s`,
//                       marginLeft: i > 0 ? "8px" : "0",
//                     }}
//                   ></div>
//                 ))}
//               </div>
//               <ChefHat className="w-16 h-16 text-primary relative z-10 animate-bounce" />
//             </div>
//             <p className="text-center text-sm text-muted-foreground mt-2">
//               Our chefs are preparing your food with fresh Indian spices 🌶️
//             </p>
//           </div>
//         </div>

//         {/* Action Buttons */}
//         <div className="flex gap-3 justify-center">
//           <Button variant="outline" onClick={() => navigate("/restaurants")}>
//             Back to Restaurants
//           </Button>
//           <Button onClick={() => navigate("/track-order")}>Track My Order</Button>
//         </div>
//       </div>
//     </main>
//   );
// };

// export default OrderPlaced;
// import { useEffect, useState } from "react";
// import { CheckCircle, Clock, ChefHat, Flame, Bike } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { useNavigate } from "react-router-dom";
// import { useCart } from "../context/cartContext.jsx"; 

// export const OrderPlaced = () => {
//   const navigate = useNavigate();
//   const { cartItems = [], clearCart } = useCart();
//   const [step, setStep] = useState(0);

//   // Progress step animation
//   useEffect(() => {
//     const timer = setInterval(() => {
//       setStep((prev) => (prev < 4 ? prev + 1 : prev));
//     }, 2000);
//     return () => clearInterval(timer);
//   }, []);

// //   useEffect(() => {
// //     if (cartItems.length > 0) {
// //       const timeout = setTimeout(() => clearCart(), 8000);
// //       return () => clearTimeout(timeout);
// //     }
// //   }, [cartItems, clearCart]);

//   // Calculate total amount
//   const totalAmount = cartItems.reduce(
//     (acc, item) => acc + parseFloat(item.price || 0) * (item.quantity || 1),
//     0
//   );

//   const restaurantName = cartItems?.[0]?.kitchen || "Unknown Kitchen";

//   const steps = [
//     { icon: CheckCircle, label: "Order Confirmed", color: "text-green-500" },
//     { icon: ChefHat, label: "Preparing Food", color: "text-orange-500" },
//     { icon: Flame, label: "Cooking", color: "text-red-500" },
//     { icon: Clock, label: "Packed & Ready", color: "text-yellow-500" },
//     { icon: Bike, label: "Out for Delivery", color: "text-blue-500" },
//   ];

//   return (
//     <main className="min-h-screen bg-gradient-to-b from-orange-50 via-yellow-50 to-background flex items-center justify-center p-4">
//       <div className="max-w-2xl w-full space-y-8 animate-fade-in">
//         {/* Success Message */}
//         <div className="text-center space-y-4">
//           <div className="relative inline-block">
//             <div className="absolute inset-0 animate-pulse bg-green-500/20 rounded-full blur-2xl"></div>
//             <CheckCircle className="w-24 h-24 text-green-500 animate-scale-in relative z-10" strokeWidth={1.5} />
//           </div>
//           <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
//             Order Placed Successfully!
//           </h1>
//           <p className="text-lg text-muted-foreground">
//             Your delicious meal is being prepared with love 🍲
//           </p>
//         </div>

//         {/* Order Details */}
//         <div className="bg-card rounded-xl border shadow-carousel p-6 space-y-6">
//           <div className="space-y-2">
//             <div className="flex justify-between items-center">
//               <span className="text-sm text-muted-foreground">Order Number</span>
//               <span className="font-mono font-semibold">#KK-{Math.floor(Math.random() * 10000)}</span>
//             </div>
//             <div className="flex justify-between items-center">
//               <span className="text-sm text-muted-foreground">Restaurant</span>
//               <span className="font-semibold">{restaurantName}</span>
//             </div>
//             <div className="flex justify-between items-center">
//               <span className="text-sm text-muted-foreground">Amount</span>
//               <span className="font-semibold text-green-600">₹{totalAmount.toFixed(2)}</span>
//             </div>
//             <div className="flex justify-between items-center">
//               <span className="text-sm text-muted-foreground">Estimated Delivery</span>
//               <span className="font-semibold">25–30 mins</span>
//             </div>
//           </div>

//           {/* Items Ordered */}
//           <div className="border-t pt-4 space-y-2">
//             <p className="font-semibold text-sm">Items Ordered:</p>
//             {cartItems.map((item, index) => (
//               <div key={index} className="flex justify-between text-sm">
//                 <span>{item.name} × {item.quantity}</span>
//                 <span>₹{(item.price * item.quantity).toFixed(2)}</span>
//               </div>
//             ))}
//           </div>

//           {/* Progress Steps */}
//           <div className="space-y-4 pt-4 border-t">
//             {steps.map((item, index) => {
//               const Icon = item.icon;
//               const isActive = step >= index;
//               const isCurrent = step === index;

//               return (
//                 <div
//                   key={index}
//                   className={`flex items-center gap-4 transition-all duration-500 ${isActive ? "opacity-100" : "opacity-50"}`}
//                 >
//                   <div className={`relative flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all duration-500 ${isActive ? "border-primary bg-primary/10" : "border-muted bg-muted"}`}>
//                     <Icon className={`w-6 h-6 transition-all duration-500 ${isCurrent ? `${item.color} animate-pulse` : isActive ? item.color : "text-muted-foreground"}`} />
//                     {isCurrent && <div className="absolute inset-0 rounded-full border-2 border-primary animate-ping"></div>}
//                   </div>
//                   <p className={`font-medium ${isActive ? "text-foreground" : "text-muted-foreground"}`}>{item.label}</p>
//                   {isActive && index < step && <CheckCircle className="w-5 h-5 text-green-500 animate-scale-in" />}
//                 </div>
//               );
//             })}
//           </div>

//           {/* Cooking Animation */}
//           <div className="pt-4 border-t">
//             <div className="relative h-32 flex items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-orange-500/10 to-red-500/10">
//               <div className="absolute inset-0 flex items-end justify-center">
//                 {[...Array(5)].map((_, i) => (
//                   <div
//                     key={i}
//                     className="w-2 bg-gradient-to-t from-orange-500 to-yellow-500 rounded-t-full animate-pulse opacity-60"
//                     style={{ height: `${Math.random() * 40 + 20}%`, animationDelay: `${i * 0.2}s`, marginLeft: i > 0 ? "8px" : "0" }}
//                   ></div>
//                 ))}
//               </div>
//               <ChefHat className="w-16 h-16 text-primary relative z-10 animate-bounce" />
//             </div>
//             <p className="text-center text-sm text-muted-foreground mt-2">
//               Our chefs are preparing your food with fresh Indian spices 🌶️
//             </p>
//           </div>
//         </div>

//         {/* Action Buttons */}
//         <div className="flex gap-3 justify-center">
//           <Button variant="outline" onClick={() => navigate("/restaurants")}>
//             Back to Restaurants
//           </Button>
//           <Button onClick={() => navigate("/track-order")}>Track My Order</Button>
//         </div>
//       </div>
//     </main>
//   );
// };

// export default OrderPlaced;
import { useEffect, useState } from "react";
import { CheckCircle, Clock, ChefHat, Flame, Bike } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/cartContext.jsx";

export const OrderPlaced = () => {
  const navigate = useNavigate();
  const { items = [], clearCart, formatCurrency } = useCart();
  const [step, setStep] = useState(0);

  // progress animation
  useEffect(() => {
    const timer = setInterval(() => {
      setStep((prev) => (prev < 4 ? prev + 1 : prev));
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  // optional: clear cart automatically after delay
  useEffect(() => {
    if (items.length > 0) {
      const timeout = setTimeout(() => clearCart(), 20000);
      return () => clearTimeout(timeout);
    }
  }, [items, clearCart]);

  // totals and info
  const totalAmount = items.reduce(
    (acc, item) => acc + parseFloat(item.price || 0) * (item.quantity || 1),
    0
  );

  const restaurantName = items?.[0]?.kitchen || "Unknown Kitchen";

  const steps = [
    { icon: CheckCircle, label: "Order Confirmed", color: "text-green-500" },
    { icon: ChefHat, label: "Preparing Food", color: "text-orange-500" },
    { icon: Flame, label: "Cooking", color: "text-red-500" },
    { icon: Clock, label: "Packed & Ready", color: "text-yellow-500" },
    { icon: Bike, label: "Out for Delivery", color: "text-blue-500" },
  ];

  return (
    <main className="min-h-screen bg-green-50 to-background flex items-center justify-center p-4">
      <div className="max-w-2xl w-full space-y-8 animate-fade-in">
        {/* ✅ Success message */}
        <div className="text-center space-y-4">
          <div className="relative inline-block">
            <div className="absolute inset-0 animate-pulse bg-green-500/20 rounded-full blur-2xl"></div>
            <CheckCircle
              className="w-24 h-24 text-green-500 animate-scale-in relative z-10"
              strokeWidth={1.5}
            />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
            Order Placed Successfully!
          </h1>
          <p className="text-lg text-muted-foreground">
            Your delicious meal is being prepared with love 🍲
          </p>
        </div>

        {/* ✅ Order details */}
        <div className="bg-card rounded-xl border shadow-carousel p-6 space-y-6">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Order Number</span>
              <span className="font-mono font-semibold">
                #KK-{Math.floor(Math.random() * 10000)}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Restaurant</span>
              <span className="font-semibold">{restaurantName}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Amount</span>
              <span className="font-semibold text-green-600">
                {formatCurrency(totalAmount)}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">
                Estimated Delivery
              </span>
              <span className="font-semibold">25–30 mins</span>
            </div>
          </div>

          {/* ✅ Items Ordered */}
          <div className="border-t pt-4 space-y-2">
            <p className="font-semibold text-sm">Items Ordered:</p>
            {items.map((item, index) => (
              <div key={index} className="flex justify-between text-sm">
                <span>
                  {item.name} × {item.quantity}
                </span>
                <span>
                  {formatCurrency(item.price * item.quantity)}
                </span>
              </div>
            ))}
          </div>

          {/* ✅ Progress Steps */}
          <div className="space-y-4 pt-4 border-t">
            {steps.map((item, index) => {
              const Icon = item.icon;
              const isActive = step >= index;
              const isCurrent = step === index;

              return (
                <div
                  key={index}
                  className={`flex items-center gap-4 transition-all duration-500 ${
                    isActive ? "opacity-100" : "opacity-50"
                  }`}
                >
                  <div
                    className={`relative flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all duration-500 ${
                      isActive
                        ? "border-primary bg-primary/10"
                        : "border-muted bg-muted"
                    }`}
                  >
                    <Icon
                      className={`w-6 h-6 transition-all duration-500 ${
                        isCurrent
                          ? `${item.color} animate-pulse`
                          : isActive
                          ? item.color
                          : "text-muted-foreground"
                      }`}
                    />
                    {isCurrent && (
                      <div className="absolute inset-0 rounded-full border-2 border-primary animate-ping"></div>
                    )}
                  </div>
                  <p
                    className={`font-medium ${
                      isActive ? "text-foreground" : "text-muted-foreground"
                    }`}
                  >
                    {item.label}
                  </p>
                  {isActive && index < step && (
                    <CheckCircle className="w-5 h-5 text-green-500 animate-scale-in" />
                  )}
                </div>
              );
            })}
          </div>

          
        </div>

        {/* ✅ Action Buttons */}
        <div className="flex gap-3 justify-center">
          <Button variant="outline" onClick={() => navigate("/")}>
            Back to Restaurants
          </Button>
         
        </div>
      </div>
    </main>
  );
};

export default OrderPlaced;
