
import { useEffect, useState } from "react";
import { CheckCircle, Clock, ChefHat, Flame, Bike, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate, useLocation } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";
import axios from "axios";

export const OrderPlaced = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { clearCart, formatCurrency } = useCart();
  
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(true);
  const [orderData, setOrderData] = useState(null);
  const [error, setError] = useState(null);

  // Get orderId from navigation state or URL params
  const orderId = location.state?.orderId;

  // Fetch order details
  useEffect(() => {
    const fetchOrderDetails = async () => {
      if (!orderId) {
        setError("No order ID provided");
        setLoading(false);
        return;
      }

      try {
        const token = localStorage.getItem("idToken");
        if (!token) {
          console.error("No token found");
          navigate("/");
          return;
        }

        const response = await axios.get(
          `${import.meta.env.VITE_API}/orders/${orderId}`,
          {
            headers: { Authorization: `Bearer ${token}` }
          }
        );

        setOrderData(response.data);
        
        // Map order status to step
        if (response.data.status && response.data.status.length > 0) {
          const latestStatus = response.data.status[response.data.status.length - 1];
          const statusMap = {
            'pending': 0,
            'confirmed': 0,
            'preparing': 1,
            'cooking': 2,
            'ready': 3,
            'out_for_delivery': 4,
            'delivered': 4
          };
          setStep(statusMap[latestStatus.state] || 0);
        }

        // Clear cart after successful order fetch
        clearCart();
      } catch (err) {
        console.error("Error fetching order details:", err);
        setError("Failed to load order details");
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [orderId, navigate, clearCart]);

  // Poll for status updates
  useEffect(() => {
    if (!orderId) return;

    const pollOrderStatus = async () => {
      try {
        const token = localStorage.getItem("idToken");
        const response = await axios.get(
          `${import.meta.env.VITE_API}/orders/${orderId}`,
          {
            headers: { Authorization: `Bearer ${token}` }
          }
        );

        if (response.data.status && response.data.status.length > 0) {
          const latestStatus = response.data.status[response.data.status.length - 1];
          const statusMap = {
            'pending': 0,
            'confirmed': 0,
            'preparing': 1,
            'cooking': 2,
            'ready': 3,
            'out_for_delivery': 4,
            'delivered': 4
          };
          setStep(statusMap[latestStatus.state] || 0);
          setOrderData(response.data);
        }
      } catch (err) {
        console.error("Error polling order status:", err);
      }
    };

    // Poll every 10 seconds
    const interval = setInterval(pollOrderStatus, 10000);
    return () => clearInterval(interval);
  }, [orderId]);

  const steps = [
    { icon: CheckCircle, label: "Order Confirmed", color: "text-green-500" },
    { icon: ChefHat, label: "Preparing Food", color: "text-orange-500" },
    { icon: Flame, label: "Cooking", color: "text-red-500" },
    { icon: Clock, label: "Packed & Ready", color: "text-yellow-500" },
    { icon: Bike, label: "Out for Delivery", color: "text-blue-500" },
  ];

  // Loading state
  if (loading) {
    return (
      <main className="min-h-screen bg-green-50 flex items-center justify-center p-4">
        <div className="text-center space-y-4">
          <Loader2 className="w-12 h-12 animate-spin text-primary mx-auto" />
          <p className="text-lg text-muted-foreground">Loading order details...</p>
        </div>
      </main>
    );
  }

  // Error state
  if (error || !orderData) {
    return (
      <main className="min-h-screen bg-green-50 flex items-center justify-center p-4">
        <div className="text-center space-y-4">
          <p className="text-lg text-red-500">{error || "Order not found"}</p>
          <Button onClick={() => navigate("/")}>Back to Home</Button>
        </div>
      </main>
    );
  }

  // Calculate totals from order data
  const totalAmount = orderData.totalAmount || 
    orderData.items?.reduce(
      (acc, item) => acc + parseFloat(item.price || 0) * (item.quantity || 1),
      0
    ) || 0;

  const restaurantName = orderData.restaurantName || 
    orderData.items?.[0]?.kitchen || 
    "Unknown Kitchen";

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
                #{orderData._id?.slice(-8).toUpperCase() || 'N/A'}
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
              <span className="font-semibold">
                {orderData.estimatedDeliveryTime || "25–30 mins"}
              </span>
            </div>
            {orderData.deliveryAddress && (
              <div className="flex justify-between items-start">
                <span className="text-sm text-muted-foreground">
                  Delivery Address
                </span>
                <span className="font-semibold text-right max-w-xs">
                  {orderData.deliveryAddress}
                </span>
              </div>
            )}
          </div>

          {/* ✅ Items Ordered */}
          {orderData.items && orderData.items.length > 0 && (
            <div className="border-t pt-4 space-y-2">
              <p className="font-semibold text-sm">Items Ordered:</p>
              {orderData.items.map((item, index) => (
                <div key={index} className="flex justify-between text-sm">
                  <span>
                    {item.name || item.itemName} × {item.quantity || 1}
                  </span>
                  <span>
                    {formatCurrency((item.price || 0) * (item.quantity || 1))}
                  </span>
                </div>
              ))}
            </div>
          )}

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
          <Button onClick={() => navigate(`/order-tracking/${orderId}`)}>
            Track Order
          </Button>
        </div>
      </div>
    </main>
  );
};

export default OrderPlaced;