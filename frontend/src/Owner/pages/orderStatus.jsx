
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Clock, CheckCircle, AlertCircle } from "lucide-react";
import axios from "axios";
import SimpleNav from "../components/simple-nav";

export default function OrderStatusPage() {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [activeTab, setActiveTab] = useState("in-progress");

  // Helper function to get auth headers
  const getAuthHeaders = () => {
    const idToken = localStorage.getItem("idToken");
    
    if (!idToken) {
      console.error("No idToken found in localStorage");
      return null;
    }
    
    // Log token info for debugging (without exposing full token)
    console.log("Token exists:", !!idToken);
    console.log("Token length:", idToken.length);
    console.log("Token starts with:", idToken.substring(0, 10) + "...");
    
    return {
      Authorization: `Bearer ${idToken}`,
      'Content-Type': 'application/json'
    };
  };

  // 🔹 Fetch order
  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const headers = getAuthHeaders();
        
        if (!headers) {
          setError("Authentication required. Please log in again.");
          setLoading(false);
          // Optionally redirect to login
          // navigate('/login');
          return;
        }

        if (!orderId) {
          setError("Order ID is missing");
          setLoading(false);
          return;
        }

        console.log("Fetching order:", orderId);
        
        const res = await axios.get(
          `${import.meta.env.VITE_API}/orders/${orderId}`,
          { headers }
        );

        const fetched = res.data;
        console.log("Fetched order data:", fetched);

        // Enrich dishes with full details
        const enrichedDishes = await Promise.all(
          fetched.dishes.map(async (dish) => {
            try {
              const dishRes = await axios.get(
                `${import.meta.env.VITE_API}/menus/dish/${dish.dishId}`,
                { headers }
              );
              return {
                ...dishRes.data,
                quantity: dish.quantity,
              };
            } catch (err) {
              console.error("Error fetching dish:", dish.dishId, err);
              return { 
                name: "Unknown Dish", 
                price: 0, 
                quantity: dish.quantity,
                dishId: dish.dishId 
              };
            }
          })
        );

        fetched.dishes = enrichedDishes;
        setOrder(fetched);
        setStatus(fetched.deliveryStatus || "Preparing Order");

        if (fetched.deliveryStatus === "Order Delivered") {
          setActiveTab("completed");
          setTimeRemaining(0);
        } else {
          setActiveTab("in-progress");
          if (fetched.estimatedTime) {
            setTimeRemaining(fetched.estimatedTime * 60);
          }
        }

        setError(null);
      } catch (err) {
        console.error("Failed to fetch order details:", err);
        
        if (err.response?.status === 401) {
          setError("Authentication failed. Your session may have expired. Please log in again.");
          // Optionally clear the token and redirect
          // localStorage.removeItem("idToken");
          // navigate('/login');
        } else if (err.response?.status === 404) {
          setError("Order not found.");
        } else {
          setError(err.response?.data?.message || "Failed to load order details. Please try again.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId, navigate]);

  // 🔹 Timer effect
  useEffect(() => {
    if (status === "Order Delivered") {
      setTimeRemaining(0);
      setActiveTab("completed");
      return;
    }

    if (timeRemaining <= 0) return;
    
    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeRemaining, status]);

  // 🔹 Format time
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  // 🔹 Handle status update
  const handleUpdateStatus = async () => {
    try {
      const headers = getAuthHeaders();
      
      if (!headers) {
        alert("Authentication required. Please log in again.");
        return;
      }

      console.log("Updating delivery status to:", status);

      const res = await axios.patch(
        `${import.meta.env.VITE_API}/orders/${orderId}/delivery`,
        { newDeliveryStatus: status },
        { headers }
      );

      console.log(`Order updated to "${status}" ✅`);
      
      // Preserve enriched dishes data
      const updatedOrder = {
        ...res.data,
        dishes: order.dishes // Keep the enriched dishes with name, price, image, etc.
      };
      
      setOrder(updatedOrder);
      setStatus(res.data.deliveryStatus);

      if (res.data.deliveryStatus === "Order Delivered") {
        setActiveTab("completed");
        setTimeRemaining(0);
      }
    } catch (err) {
      console.error("Error updating order status:", err);
      
      if (err.response?.status === 401) {
        alert("Authentication failed. Please log in again.");
      } else if (
        err.response?.status === 400 &&
        err.response.data.message?.includes("already marked as delivered")
      ) {
        console.warn("Already delivered — switching tab anyway");
        setActiveTab("completed");
        setTimeRemaining(0);
        
        // Just update the status locally without refetching
        setOrder(prev => ({
          ...prev,
          deliveryStatus: "Order Delivered"
        }));
      } else {
        alert(err.response?.data?.message || "Failed to update order status");
      }
    }
  };

  // Loading state
  if (loading) {
    return (
      <>
        <SimpleNav />
        <main className="flex justify-center items-center h-screen text-lg">
          Loading order details...
        </main>
      </>
    );
  }

  // Error state
  if (error) {
    return (
      <>
        <SimpleNav />
        <main className="flex flex-col justify-center items-center h-screen text-lg">
          <AlertCircle className="h-12 w-12 text-red-500 mb-4" />
          <p className="text-red-500 mb-4">{error}</p>
          <Button onClick={() => window.location.reload()}>
            Try Again
          </Button>
        </main>
      </>
    );
  }

  // Order not found
  if (!order) {
    return (
      <>
        <SimpleNav />
        <main className="flex justify-center items-center h-screen text-lg text-red-500">
          Order not found.
        </main>
      </>
    );
  }

  return (
    <>
      <SimpleNav />

      <main className="mx-auto grid max-w-6xl grid-cols-1 gap-6 p-6 md:grid-cols-[280px_1fr] transition-all">
        {/* Sidebar */}
        <aside className="space-y-4">
          <Card className="rounded-lg border border-border p-2">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid grid-cols-3">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="in-progress">In Progress</TabsTrigger>
                <TabsTrigger value="completed">Completed</TabsTrigger>
              </TabsList>

              <TabsContent value="in-progress">
                <ScrollArea className="h-[420px]">
                  <ul className="divide-y divide-border">
                    <li className="p-3 bg-muted rounded-md">
                      <div className="font-medium">
                        Customer: {order.user?.name || "Customer"}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Order #{order._id}
                      </div>
                    </li>
                  </ul>
                </ScrollArea>
              </TabsContent>

              <TabsContent value="completed">
                <div className="flex flex-col items-center p-4 text-green-600">
                  <CheckCircle className="h-8 w-8 mb-2" />
                  <p className="text-sm font-medium">
                    Order #{order._id} delivered successfully
                  </p>
                </div>
              </TabsContent>
            </Tabs>
          </Card>
        </aside>

        {/* Main Content */}
        <section className="space-y-6">
          <header className="space-y-1">
            <h1 className="text-3xl font-bold">Order #{order._id}</h1>
            <p className="text-gray-500">
              Placed by {order.user?.name || "Customer"} —{" "}
              {order.dishes?.length || 0} item(s)
            </p>
          </header>

          {/* Timer */}
          <Card className="rounded-lg border border-border p-6 shadow-sm transition-all">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Clock className="h-8 w-8 text-green-600" />
                <div>
                  <h2 className="text-lg font-semibold">Delivery Timer</h2>
                  <p className="text-sm text-muted-foreground">
                    {status === "Order Delivered"
                      ? "Delivered successfully!"
                      : "Time remaining"}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-4xl font-bold text-green-600">
                  {timeRemaining > 0 ? formatTime(timeRemaining) : "00:00"}
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  {order.estimatedTime} min total
                </p>
              </div>
            </div>
          </Card>

          {/* Dishes */}
          <Card className="rounded-lg border border-border p-4">
            <h2 className="text-lg font-semibold mb-3">Ordered Dishes</h2>
            <div className="grid gap-3">
              {order.dishes?.map((dish, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between border border-border rounded-lg p-3 hover:bg-muted/60 transition"
                >
                  <div className="flex items-center gap-3">
                    {dish.image && (
                      <img
                        src={dish.image}
                        alt={dish.name}
                        className="h-14 w-14 rounded-md object-cover border"
                      />
                    )}
                    <div>
                      <p className="font-medium">{dish.name}</p>
                      <p className="text-sm text-muted-foreground">
                        ₹{dish.price} × {dish.quantity || 1}
                      </p>
                    </div>
                  </div>
                  <p className="text-right font-semibold">
                    ₹{dish.price * (dish.quantity || 1)}
                  </p>
                </div>
              ))}
            </div>
          </Card>

          {/* Status */}
          <div className="space-y-3">
            <h2 className="text-lg font-semibold">Order Status</h2>
            <Card className="rounded-lg border border-border p-2">
              <RadioGroup
                value={status}
                onValueChange={setStatus}
                className="grid gap-2"
              >
                {[
                  "Pending",
                  "Preparing Order",
                  "Ready for Pickup",
                  "Order Picked Up",
                  "Order Delivered",
                  "Cancelled",
                ].map((value) => (
                  <div
                    key={value}
                    className={`flex items-center justify-between rounded-md border border-border bg-card p-3 transition ${
                      status === value ? "border-green-500 bg-green-50" : ""
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <RadioGroupItem id={value} value={value} />
                      <Label htmlFor={value} className="cursor-pointer">
                        {value}
                      </Label>
                    </div>
                  </div>
                ))}
              </RadioGroup>
            </Card>
          </div>

          {/* Save Button */}
          <div className="flex justify-end">
            <Button
              variant="default"
              className="bg-green-600 hover:bg-green-700"
              onClick={handleUpdateStatus}
            >
              Update Status
            </Button>
          </div>
        </section>
      </main>
    </>
  );
}