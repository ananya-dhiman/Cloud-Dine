
// import { Link } from "react-router-dom";
// import { useState, useEffect } from "react";
// import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
// import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
// import { Badge } from "@/components/ui/badge";
// import { Card } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
// import { Input } from "@/components/ui/input";
// import SimpleNav from "../components/simple-nav";
// import axios from "axios";
// import {useNavigate} from "react-router-dom";
// function StatusBadge({ status }) {
//   const label =
//     status === "new" ? "Pending" : status === "in-progress" ? "In Progress" : "Delivered";
//   const color =
//     status === "new"
//       ? "bg-yellow-100 text-yellow-800"
//       : status === "in-progress"
//       ? "bg-blue-100 text-blue-800"
//       : "bg-green-100 text-green-800";
//   return <Badge className={`rounded-full px-3 font-medium ${color}`}>{label}</Badge>;
// }

// function OrdersTable({ data, onAccept, onReject }) {
//   return (
//     <Card className="overflow-hidden rounded-lg border border-gray-200">
//       <Table className="border-collapse">
//         <TableHeader className="bg-gray-50">
//           <TableRow className="border-b border-gray-200">
//             <TableHead className="w-[140px] px-3 py-2">Order ID</TableHead>
//             <TableHead className="px-3 py-2">Customer</TableHead>
//             <TableHead className="w-[120px] px-3 py-2">Items</TableHead>
//             <TableHead className="w-[120px] text-right px-3 py-2">Total</TableHead>
//             <TableHead className="w-[140px] px-3 py-2">Status</TableHead>
//             <TableHead className="w-[180px] text-right px-3 py-2">Actions</TableHead>
//           </TableRow>
//         </TableHeader>

//         <TableBody>
//           {data.map((o) => (
//             <TableRow key={o._id} className="border-b last:border-b-0">
//               <TableCell className="px-3 py-2">#{o._id}</TableCell>
//               <TableCell className="px-3 py-2 font-medium">
//                 <Link to={`/orders/${o._id}`} className="text-red-600 hover:underline">
//                   {o.user.name || "Customer"}
//                 </Link>
//               </TableCell>
//               <TableCell className="px-3 py-2">{o.dishes.length}</TableCell>
//               <TableCell className="px-3 py-2 text-right">₹{o.totalAmount.toFixed(2)}</TableCell>
//               <TableCell className="px-3 py-2">
//                 <StatusBadge
//                   status={
//                     o.status[0]?.boolStatus === null
//                       ? "new"
//                       : o.status[0]?.boolStatus
//                       ? "in-progress"
//                       : "delivered"
//                   }
//                 />
//               </TableCell>
//               <TableCell className="px-3 py-2 text-right space-x-2">
//                 {o.status[0]?.boolStatus === null ? (
//                   <>
//                     <Button
//                       size="sm"
//                       className="bg-green-200 hover:bg-green-300 text-green-800"
//                       onClick={() => onAccept(o._id)}
//                     >
//                       Accept
//                     </Button>
//                     <Button
//                       size="sm"
//                       variant="destructive"
//                       className="bg-red-200 hover:bg-red-300 text-red-800"
//                       onClick={() => onReject(o._id)}
//                     >
//                       Reject
//                     </Button>
//                   </>
//                 ) : (
//                   <Link to={`${o._id}`} className="font-medium text-red-600 hover:underline">
//                     View
//                   </Link>
//                 )}
//               </TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </Card>
//   );
// }

// export default function OrdersPage() {
//   const [orders, setOrders] = useState([]);
//   const [ownerId, setOwnerId] = useState(null);
//   const [kitchenId, setKitchenId] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [showRejectDialog, setShowRejectDialog] = useState(false);
//   const [rejectionReason, setRejectionReason] = useState("");
//   const [selectedOrder, setSelectedOrder] = useState(null);
//   const navigate=useNavigate();
//   const idToken = localStorage.getItem("idToken");

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const token = localStorage.getItem("idToken");
//         if (!token) return;

//         const profileRes = await axios.get(`${import.meta.env.VITE_API}/users/profile`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });

//         const getOwnerId = profileRes.data?.user?._id;
//         setOwnerId(getOwnerId);

//         if (!getOwnerId) return;

//         const kitchenRes = await axios.get(
//           `${import.meta.env.VITE_API}/kitchens/owner/${getOwnerId}`,
//           { headers: { Authorization: `Bearer ${token}` } }
//         );
//         console.log(kitchenRes)
//         const fetchedKitchenId = kitchenRes.data?._id;

//         setKitchenId(fetchedKitchenId);
//       } catch (error) {
//         console.warn("Error fetching profile or kitchen:", error);
//         navigate("/");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   useEffect(() => {
//     const fetchOrders = async () => {
//       try {
//         const res = await axios.get(`${import.meta.env.VITE_API}/orders/kitchen/${kitchenId}`, {
//           headers: { Authorization: `Bearer ${idToken}` },
//         });
//         setOrders(res.data);
//       } catch (err) {
//         console.error("Failed to fetch orders:", err);
//       }
//     };

//     if (kitchenId) fetchOrders();
//   }, [kitchenId, idToken]);

//   const handleAccept = async (orderId) => {
//     try {
//       const estimatedTime = prompt("Enter estimated preparation time (e.g., 30 mins):");
//       if (!estimatedTime) return;

//       await axios.patch(
//         `${import.meta.env.VITE_API}/orders/${orderId}/status`,
//         { action: "accept", estimatedTime },
//         { headers: { Authorization: `Bearer ${idToken}` } }
//       );

//       setOrders((prev) =>
//         prev.map((order) =>
//           order._id === orderId
//             ? { ...order, status: [{ ...order.status[0], boolStatus: true }] }
//             : order
//         )
//       );
//     } catch (err) {
//       console.error("Failed to accept order:", err);
//     }
//   };

//   const handleReject = (orderId) => {
//     setSelectedOrder(orderId);
//     setShowRejectDialog(true);
//   };

//   const confirmReject = async () => {
//     if (!rejectionReason.trim()) {
//       alert("Please enter a rejection reason.");
//       return;
//     }

//     try {
//       await axios.patch(
//         `${import.meta.env.VITE_API}/orders/${selectedOrder}/status`,
//         { action: "reject", rejectionNote: rejectionReason },
//         { headers: { Authorization: `Bearer ${idToken}` } }
//       );

//       setOrders((prev) =>
//         prev.map((order) =>
//           order._id === selectedOrder
//             ? { ...order, status: [{ ...order.status[0], boolStatus: false }] }
//             : order
//         )
//       );

//       setShowRejectDialog(false);
//       setRejectionReason("");
//       setSelectedOrder(null);
//     } catch (err) {
//       console.error("Failed to reject order:", err);
//     }
//   };

//   const filterBy = (status) =>
//     status === "all"
//       ? orders
//       : orders.filter((o) =>
//           status === "new"
//             ? o.status[0]?.boolStatus === null
//             : status === "in-progress"
//             ? o.status[0]?.boolStatus === true
//             : o.status[0]?.boolStatus === false
//         );

//   return (
//     <>
//       <SimpleNav />
//       <main className="mx-auto max-w-6xl space-y-6 p-6">
//         <header className="space-y-1">
//           <h1 className="text-3xl font-bold text-gray-900">Orders</h1>
//           <p className="text-gray-500">Manage new, in-progress, and completed orders</p>
//         </header>

//         <Tabs defaultValue="new" className="space-y-4">
//           <TabsList className="p-1 rounded-lg bg-gray-100">
//             <TabsTrigger value="new">New</TabsTrigger>
//             <TabsTrigger value="in-progress">In Progress</TabsTrigger>
//             <TabsTrigger value="delivered">Delivered</TabsTrigger>
//           </TabsList>

//           <TabsContent value="new" className="space-y-4 -mt-1">
//             <OrdersTable data={filterBy("new")} onAccept={handleAccept} onReject={handleReject} />
//           </TabsContent>
//           <TabsContent value="in-progress">
//             <OrdersTable data={filterBy("in-progress")} />
//           </TabsContent>
//           <TabsContent value="delivered">
//             <OrdersTable data={filterBy("delivered")} />
//           </TabsContent>
//         </Tabs>
//       </main>

//       {/* Reject Reason Dialog */}
//       <Dialog open={showRejectDialog} onOpenChange={setShowRejectDialog}>
//         <DialogContent className="sm:max-w-md">
//           <DialogHeader>
//             <DialogTitle>Reject Order</DialogTitle>
//           </DialogHeader>
//           <p className="text-gray-600 text-sm mb-3">
//             Please provide a reason for rejecting this order:
//           </p>
//           <Input
//             placeholder="e.g. Out of ingredients, kitchen closed early..."
//             value={rejectionReason}
//             onChange={(e) => setRejectionReason(e.target.value)}
//           />
//           <DialogFooter className="mt-4 space-x-2">
//             <Button variant="outline" onClick={() => setShowRejectDialog(false)}>
//               Cancel
//             </Button>
//             <Button variant="destructive" onClick={confirmReject}>
//               Confirm Reject
//             </Button>
//           </DialogFooter>
//         </DialogContent>
//       </Dialog>
//     </>
//   );
// }
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import SimpleNav from "../components/simple-nav";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function StatusBadge({ status }) {
  const label =
    status === "new" ? "Pending" : status === "in-progress" ? "In Progress" : "Completed";
  const color =
    status === "new"
      ? "bg-yellow-100 text-yellow-800"
      : status === "in-progress"
      ? "bg-blue-100 text-blue-800"
      : "bg-green-100 text-green-800";
  return <Badge className={`rounded-full px-3 font-medium ${color}`}>{label}</Badge>;
}

function OrdersTable({ data, onAccept, onReject }) {
  return (
    <Card className="overflow-hidden rounded-lg border border-gray-200">
      <Table className="border-collapse">
        <TableHeader className="bg-gray-50">
          <TableRow className="border-b border-gray-200">
            <TableHead className="w-[140px] px-3 py-2">Order ID</TableHead>
            <TableHead className="px-3 py-2">Customer</TableHead>
            <TableHead className="w-[120px] px-3 py-2">Items</TableHead>
            <TableHead className="w-[120px] text-right px-3 py-2">Total</TableHead>
            <TableHead className="w-[140px] px-3 py-2">Status</TableHead>
            <TableHead className="w-[180px] text-right px-3 py-2">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {data.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                No orders found
              </TableCell>
            </TableRow>
          ) : (
            data.map((o) => (
              <TableRow key={o._id} className="border-b last:border-b-0">
                <TableCell className="px-3 py-2">#{o._id}</TableCell>
                <TableCell className="px-3 py-2 font-medium">
                  <Link to={`/orders/${o._id}`} className="text-red-600 hover:underline">
                    {o.user.name || "Customer"}
                  </Link>
                </TableCell>
                <TableCell className="px-3 py-2">{o.dishes.length}</TableCell>
                <TableCell className="px-3 py-2 text-right">₹{o.totalAmount.toFixed(2)}</TableCell>
                <TableCell className="px-3 py-2">
                  <StatusBadge
                    status={
                      o.status[0]?.boolStatus === null
                        ? "new"
                        : o.status[0]?.boolStatus
                        ? "in-progress"
                        : "completed"
                    }
                  />
                </TableCell>
                <TableCell className="px-3 py-2 text-right space-x-2">
                  {o.status[0]?.boolStatus === null ? (
                    <>
                      <Button
                        size="sm"
                        className="bg-green-200 hover:bg-green-300 text-green-800"
                        onClick={() => onAccept(o._id)}
                      >
                        Accept
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        className="bg-red-200 hover:bg-red-300 text-red-800"
                        onClick={() => onReject(o._id)}
                      >
                        Reject
                      </Button>
                    </>
                  ) : (
                    <Link to={`${o._id}`} className="font-medium text-red-600 hover:underline">
                      View
                    </Link>
                  )}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </Card>
  );
}

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [ownerId, setOwnerId] = useState(null);
  const [kitchenId, setKitchenId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showRejectDialog, setShowRejectDialog] = useState(false);
  const [rejectionReason, setRejectionReason] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [activeTab, setActiveTab] = useState("new");
  const navigate = useNavigate();
  const idToken = localStorage.getItem("idToken");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("idToken");
        if (!token) return;

        const profileRes = await axios.get(`${import.meta.env.VITE_API}/users/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const getOwnerId = profileRes.data?.user?._id;
        setOwnerId(getOwnerId);

        if (!getOwnerId) return;

        const kitchenRes = await axios.get(
          `${import.meta.env.VITE_API}/kitchens/owner/${getOwnerId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        console.log(kitchenRes);
        const fetchedKitchenId = kitchenRes.data?._id;

        setKitchenId(fetchedKitchenId);
      } catch (error) {
        console.warn("Error fetching profile or kitchen:", error);
        navigate("/");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API}/orders/kitchen/${kitchenId}`, {
          headers: { Authorization: `Bearer ${idToken}` },
        });
        setOrders(res.data);
      } catch (err) {
        console.error("Failed to fetch orders:", err);
      }
    };

    if (kitchenId) fetchOrders();
  }, [kitchenId, idToken]);

  const handleAccept = async (orderId) => {
    try {
      const estimatedTime = prompt("Enter estimated preparation time (e.g., 30 mins):");
      if (!estimatedTime) return;

      await axios.patch(
        `${import.meta.env.VITE_API}/orders/${orderId}/status`,
        { action: "accept", estimatedTime },
        { headers: { Authorization: `Bearer ${idToken}` } }
      );

      setOrders((prev) =>
        prev.map((order) =>
          order._id === orderId
            ? { ...order, status: [{ ...order.status[0], boolStatus: true }] }
            : order
        )
      );

      // Switch to in-progress tab after accepting
      setActiveTab("in-progress");
    } catch (err) {
      console.error("Failed to accept order:", err);
      alert("Failed to accept order. Please try again.");
    }
  };

  const handleReject = (orderId) => {
    setSelectedOrder(orderId);
    setShowRejectDialog(true);
  };

  const confirmReject = async () => {
    if (!rejectionReason.trim()) {
      alert("Please enter a rejection reason.");
      return;
    }

    try {
      await axios.patch(
        `${import.meta.env.VITE_API}/orders/${selectedOrder}/status`,
        { action: "reject", rejectionNote: rejectionReason },
        { headers: { Authorization: `Bearer ${idToken}` } }
      );

      setOrders((prev) =>
        prev.map((order) =>
          order._id === selectedOrder
            ? { ...order, status: [{ ...order.status[0], boolStatus: false }] }
            : order
        )
      );

      setShowRejectDialog(false);
      setRejectionReason("");
      setSelectedOrder(null);

      // Switch to completed tab after rejecting
      setActiveTab("completed");
    } catch (err) {
      console.error("Failed to reject order:", err);
      alert("Failed to reject order. Please try again.");
    }
  };

  const filterBy = (status) =>
    status === "all"
      ? orders
      : orders.filter((o) =>
          status === "new"
            ? o.status[0]?.boolStatus === null
            : status === "in-progress"
            ? o.status[0]?.boolStatus === true
            : o.status[0]?.boolStatus === false
        );

  // Check if an order has been delivered (check deliveryStatus field)
  const isOrderDelivered = (order) => {
    return order.deliveryStatus === "Order Delivered";
  };

  // Filter orders for completed tab - includes rejected AND delivered orders
  const getCompletedOrders = () => {
    return orders.filter((o) => {
      // Rejected orders (boolStatus: false)
      const isRejected = o.status[0]?.boolStatus === false;
      // Delivered orders
      const isDelivered = isOrderDelivered(o);
      return isRejected || isDelivered;
    });
  };

  // Filter orders for in-progress tab - only accepted AND not delivered
  const getInProgressOrders = () => {
    return orders.filter((o) => {
      const isAccepted = o.status[0]?.boolStatus === true;
      const isDelivered = isOrderDelivered(o);
      return isAccepted && !isDelivered;
    });
  };

  if (loading) {
    return (
      <>
        <SimpleNav />
        <main className="flex justify-center items-center h-screen">
          <p className="text-lg">Loading orders...</p>
        </main>
      </>
    );
  }

  return (
    <>
      <SimpleNav />
      <main className="mx-auto max-w-6xl space-y-6 p-6">
        <header className="space-y-1">
          <h1 className="text-3xl font-bold text-gray-900">Orders</h1>
          <p className="text-gray-500">Manage new, in-progress, and completed orders</p>
        </header>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="p-1 rounded-lg bg-gray-100">
            <TabsTrigger value="new">New ({filterBy("new").length})</TabsTrigger>
            <TabsTrigger value="in-progress">
              In Progress ({getInProgressOrders().length})
            </TabsTrigger>
            <TabsTrigger value="completed">
              Completed ({getCompletedOrders().length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="new" className="space-y-4 -mt-1">
            <OrdersTable data={filterBy("new")} onAccept={handleAccept} onReject={handleReject} />
          </TabsContent>
          <TabsContent value="in-progress">
            <OrdersTable data={getInProgressOrders()} />
          </TabsContent>
          <TabsContent value="completed">
            <OrdersTable data={getCompletedOrders()} />
          </TabsContent>
        </Tabs>
      </main>

      {/* Reject Reason Dialog */}
      <Dialog open={showRejectDialog} onOpenChange={setShowRejectDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Reject Order</DialogTitle>
          </DialogHeader>
          <p className="text-gray-600 text-sm mb-3">
            Please provide a reason for rejecting this order:
          </p>
          <Input
            placeholder="e.g. Out of ingredients, kitchen closed early..."
            value={rejectionReason}
            onChange={(e) => setRejectionReason(e.target.value)}
          />
          <DialogFooter className="mt-4 space-x-2">
            <Button variant="outline" onClick={() => setShowRejectDialog(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmReject}>
              Confirm Reject
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}