
// import { Link } from "react-router-dom";
// import { useState } from "react";
// import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
// import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
// import { Badge } from "@/components/ui/badge";
// import { Card } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import SimpleNav from "../components/simple-nav";

// const INITIAL_ORDERS = [
//   { id: "IN1001", customer: "Aarav Mehta", items: 3, total: 599.0, status: "new" },
//   { id: "IN1002", customer: "Priya Sharma", items: 2, total: 420.5, status: "new" },
//   { id: "IN1003", customer: "Rohan Verma", items: 1, total: 250.0, status: "in-progress" },
//   { id: "IN1004", customer: "Neha Kapoor", items: 4, total: 875.25, status: "in-progress" },
//   { id: "IN1005", customer: "Vikram Singh", items: 2, total: 520.75, status: "delivered" },
// ];

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
//             <TableHead className="w-[140px] text-left text-gray-700 px-3 py-2">Order ID</TableHead>
//             <TableHead className="text-left text-gray-700 px-3 py-2">Customer</TableHead>
//             <TableHead className="w-[120px] text-left text-gray-700 px-3 py-2">Items</TableHead>
//             <TableHead className="w-[120px] text-right text-gray-700 px-3 py-2">Total</TableHead>
//             <TableHead className="w-[140px] text-left text-gray-700 px-3 py-2">Status</TableHead>
//             <TableHead className="w-[180px] text-right text-gray-700 px-3 py-2">Actions</TableHead>
//           </TableRow>
//         </TableHeader>

//         <TableBody>
//           {data.map((o) => (
//             <TableRow key={o.id} className="border-b last:border-b-0">
//               <TableCell className="px-3 py-2">#{o.id}</TableCell>
//               <TableCell className="px-3 py-2 font-medium">
//                 <Link to={`/orders/${o.id}`} className="text-red-600 hover:underline">
//                   {o.customer}
//                 </Link>
//               </TableCell>
//               <TableCell className="px-3 py-2">
//                 {o.items} {o.items === 1 ? "item" : "items"}
//               </TableCell>
//               <TableCell className="px-3 py-2 text-right">₹{o.total.toFixed(2)}</TableCell>
//               <TableCell className="px-3 py-2">
//                 <StatusBadge status={o.status} />
//               </TableCell>
//               <TableCell className="px-3 py-2 text-right space-x-2">
//                 {o.status === "new" ? (
//                   <>
//                     <Button
//                       size="sm"
//                       className="bg-green-200 hover:bg-green-300 text-green-800"
//                       onClick={() => onAccept(o.id)}
//                     >
//                       Accept
//                     </Button>
//                     <Button
//                       size="sm"
//                       variant="destructive"
//                       className="bg-red-200 hover:bg-red-300 text-red-800"
//                       onClick={() => onReject(o.id)}
//                     >
//                       Reject
//                     </Button>
//                   </>
//                 ) : (
//                   <Link
//                     to={`/orders/${o.id}`}
//                     className="font-medium text-red-600 hover:underline"
//                   >
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
//   const [orders, setOrders] = useState(INITIAL_ORDERS);

//   const handleAccept = (id) => {
//     setOrders((prev) =>
//       prev.map((order) =>
//         order.id === id ? { ...order, status: "in-progress" } : order
//       )
//     );
//   };

//   const handleReject = (id) => {
//     setOrders((prev) => prev.filter((order) => order.id !== id));
//   };

//   const filterBy = (status) =>
//     status === "all" ? orders : orders.filter((o) => o.status === status);

//   return (
//     <>
//        <SimpleNav />
    
//     <main className="mx-auto max-w-6xl space-y-6 p-6">
   
//       <header className="space-y-1">
//         <h1 className="text-3xl font-bold text-gray-900">Orders</h1>
//         <p className="text-gray-500">Manage new, in-progress, and completed orders</p>
//       </header>

//       <Tabs defaultValue="new" className="space-y-4">
//         <TabsList className="p-1 rounded-lg bg-gray-100">
//           <TabsTrigger
//             value="new"
//             className="data-[state=active]:bg-blue-200 data-[state=active]:text-gray-900 rounded-md"
//           >
//             New
//           </TabsTrigger>
//           <TabsTrigger
//             value="in-progress"
//             className="data-[state=active]:bg-blue-200 data-[state=active]:text-gray-900 rounded-md"
//           >
//             In Progress
//           </TabsTrigger>
//           <TabsTrigger
//             value="delivered"
//             className="data-[state=active]:bg-blue-200 data-[state=active]:text-gray-900 rounded-md"
//           >
//             Delivered
//           </TabsTrigger>
//         </TabsList>

//         <TabsContent value="new" className="space-y-4 -mt-1">
//           <OrdersTable
//             data={filterBy("new")}
//             onAccept={handleAccept}
//             onReject={handleReject}
//           />
//         </TabsContent>

//         <TabsContent value="in-progress" className="space-y-4 -mt-1">
//           <OrdersTable data={filterBy("in-progress")} />
//         </TabsContent>

//         <TabsContent value="delivered" className="space-y-4 -mt-1">
//           <OrdersTable data={filterBy("delivered")} />
//         </TabsContent>
//       </Tabs>
//     </main>
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
import SimpleNav from "../components/simple-nav";
import axios from "axios";

function StatusBadge({ status }) {
  const label =
    status === "new" ? "Pending" : status === "in-progress" ? "In Progress" : "Delivered";
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
            <TableHead className="w-[140px] text-left text-gray-700 px-3 py-2">Order ID</TableHead>
            <TableHead className="text-left text-gray-700 px-3 py-2">Customer</TableHead>
            <TableHead className="w-[120px] text-left text-gray-700 px-3 py-2">Items</TableHead>
            <TableHead className="w-[120px] text-right text-gray-700 px-3 py-2">Total</TableHead>
            <TableHead className="w-[140px] text-left text-gray-700 px-3 py-2">Status</TableHead>
            <TableHead className="w-[180px] text-right text-gray-700 px-3 py-2">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {data.map((o) => (
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
                <StatusBadge status={o.status[0]?.boolStatus === null ? "new" : o.status[0]?.boolStatus ? "in-progress" : "delivered"} />
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
                  <Link to={`/orders/${o._id}`} className="font-medium text-red-600 hover:underline">
                    View
                  </Link>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const kitchenId = localStorage.getItem("kitchenId"); // Assuming you store kitchenId on login
  const idToken = localStorage.getItem("idToken");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API}/kitchen/${kitchenId}`, {
          headers: { Authorization: `Bearer ${idToken}` },
        });
        console.log("Fetched kitchen orders:", res.data);
        setOrders(res.data.orders); // assuming backend returns { orders: [...] }
      } catch (err) {
        console.error("Failed to fetch orders:", err);
      }
    };

    if (kitchenId) fetchOrders();
  }, [kitchenId, idToken]);

  const handleAccept = async (orderId) => {
    try {
      await axios.patch(
        `${import.meta.env.VITE_API}/orders/${orderId}/accept`,
        {},
        { headers: { Authorization: `Bearer ${idToken}` } }
      );
      setOrders((prev) =>
        prev.map((order) =>
          order._id === orderId
            ? { ...order, status: [{ ...order.status[0], boolStatus: true }] }
            : order
        )
      );
    } catch (err) {
      console.error("Failed to accept order:", err);
    }
  };

  const handleReject = async (orderId) => {
    try {
      await axios.patch(
        `${import.meta.env.VITE_API}/orders/${orderId}/reject`,
        {},
        { headers: { Authorization: `Bearer ${idToken}` } }
      );
      setOrders((prev) =>
        prev.map((order) =>
          order._id === orderId
            ? { ...order, status: [{ ...order.status[0], boolStatus: false }] }
            : order
        )
      );
    } catch (err) {
      console.error("Failed to reject order:", err);
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

  return (
    <>
      <SimpleNav />

      <main className="mx-auto max-w-6xl space-y-6 p-6">
        <header className="space-y-1">
          <h1 className="text-3xl font-bold text-gray-900">Orders</h1>
          <p className="text-gray-500">Manage new, in-progress, and completed orders</p>
        </header>

        <Tabs defaultValue="new" className="space-y-4">
          <TabsList className="p-1 rounded-lg bg-gray-100">
            <TabsTrigger
              value="new"
              className="data-[state=active]:bg-blue-200 data-[state=active]:text-gray-900 rounded-md"
            >
              New
            </TabsTrigger>
            <TabsTrigger
              value="in-progress"
              className="data-[state=active]:bg-blue-200 data-[state=active]:text-gray-900 rounded-md"
            >
              In Progress
            </TabsTrigger>
            <TabsTrigger
              value="delivered"
              className="data-[state=active]:bg-blue-200 data-[state=active]:text-gray-900 rounded-md"
            >
              Delivered
            </TabsTrigger>
          </TabsList>

          <TabsContent value="new" className="space-y-4 -mt-1">
            <OrdersTable data={filterBy("new")} onAccept={handleAccept} onReject={handleReject} />
          </TabsContent>

          <TabsContent value="in-progress" className="space-y-4 -mt-1">
            <OrdersTable data={filterBy("in-progress")} />
          </TabsContent>

          <TabsContent value="delivered" className="space-y-4 -mt-1">
            <OrdersTable data={filterBy("delivered")} />
          </TabsContent>
        </Tabs>
      </main>
    </>
  );
}
