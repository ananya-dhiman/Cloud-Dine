import Order from "../models/order.js";
import Kitchen from "../models/kitchen.js";
import User from "../models/user.js";
import mongoose from "mongoose";

// Helper function 

const checkKitchenOwnership = async (kitchenId, userId) => {
    const kitchen = await Kitchen.findById(kitchenId);
    if (!kitchen || kitchen.owner.toString() !== userId.toString()) {
        return false;
    }
    return true;
};

// -----------------------------------------------------
// 1. Customer-Facing Controllers
// -----------------------------------------------------

/**
 * @desc Create a new order
 * @route POST /api/orders
 * @access Private (User)
 */
export const createOrder = async (req, res) => {
    const { kitchen, dishes, totalAmount } = req.body;
    const user = req.user._id; // Assuming user ID is from authentication middleware

    if (!kitchen || !dishes || !totalAmount) {
        return res.status(400).json({ message: "Missing required order fields: kitchen, dishes, or totalAmount." });
    }

        const findKitchen = await Kitchen.findById(kitchen);
        if (!findKitchen) return res.status(404).json({ message: "Kitchen not found" });

    
    
    try {
        const newOrder = new Order({
            user,
            kitchen,
            dishes,
            totalAmount,
            // Initial status: pending
            status: [{ boolStatus: null, rejectionNote: "" }], 
            deliveryStatus: "Pending",
        });

        const savedOrder = await newOrder.save();
        res.status(201).json(savedOrder);
    } catch (error) {
        res.status(500).json({ message: "Failed to create order.", error: error.message });
    }
};

/**
 * @desc Get details for a specific order
 * @route GET /api/orders/:orderId
 * @access Private (User, Owner, Admin - must own or be involved in the order)
 */
export const getOrderDetails = async (req, res) => {
    try {
        const order = await Order.findById(req.params.orderId)
            .populate('user', 'name email phone') // Populate relevant user info
            .populate('kitchen', 'name address location'); // Populate relevant kitchen info

        if (!order) {
            return res.status(404).json({ message: "Order not found." });
        }

        // Basic authorization check (simplified): user must be the buyer, kitchen owner, or admin
        // const isAuthorized = order.user.toString() === req.user._id.toString() || await checkKitchenOwnership(order.kitchen._id, req.user._id);

        // if (!isAuthorized && req.user.role !== 'admin') {
        //     return res.status(403).json({ message: "Not authorized to view this order." });
        // }


        res.status(200).json(order);
    } catch (error) {
        if (error instanceof mongoose.CastError) {
            return res.status(400).json({ message: "Invalid Order ID format." });
        }
        res.status(500).json({ message: "Server error fetching order details.", error: error.message });
    }
};

// -----------------------------------------------------
// 2. Kitchen Owner/Admin Controllers
// -----------------------------------------------------

/**
 * @desc Get all orders for a specific kitchen
 * @route GET /api/orders/kitchen/:kitchenId
 * @access Private (Owner, Admin)
 */
export const getOrdersForKitchen = async (req, res) => {
    const { kitchenId } = req.params;
    const { statusFilter } = req.query; // e.g., ?statusFilter=pending

    // Authorization check (assuming req.user is populated by middleware)
    if (req.user.role !== 'admin' && !(await checkKitchenOwnership(kitchenId, req.user._id))) {
        return res.status(403).json({ message: "Not authorized to view orders for this kitchen." });
    }

    try {
        let query = { kitchen: kitchenId };

        if (statusFilter === 'pending') {
             // Orders where the last status object's boolStatus is null
            query['status.0.boolStatus'] = null;
        } else if (statusFilter === 'accepted') {
             // Orders where the last status object's boolStatus is true
            query['status.0.boolStatus'] = true;
        } else if (statusFilter === 'rejected') {
            // Orders where the last status object's boolStatus is false
            query['status.0.boolStatus'] = false;
        }

        const orders = await Order.find(query)
            .populate('user', 'name phone') // Show essential customer info
            .sort({ createdAt: -1 }); // Latest orders first

        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: "Server error fetching kitchen orders.", error: error.message });
    }
};


/**
 * @desc Kitchen owner accepts or rejects an order
 * @route PATCH /api/orders/:orderId/status
 * @access Private (Owner, Admin)
 */
export const updateOrderStatus = async (req, res) => {
    const { action, estimatedTime, rejectionNote } = req.body; // action: 'accept' or 'reject'
    const { orderId } = req.params;

    if (action !== 'accept' && action !== 'reject') {
        return res.status(400).json({ message: "Action must be 'accept' or 'reject'." });
    }

    if (action === 'accept' && !estimatedTime) {
        return res.status(400).json({ message: "Estimated time is required when accepting an order." });
    }

    try {
        const order = await Order.findById(orderId).populate('kitchen');

        if (!order) {
            return res.status(404).json({ message: "Order not found." });
        }

        // Authorization Check
        if (req.user.role !== 'admin' && !(await checkKitchenOwnership(order.kitchen._id, req.user._id))) {
            return res.status(403).json({ message: "Not authorized to update this order's status." });
        }

        // Status Check: Only process if the order is currently 'pending' (boolStatus: null)
        const currentStatus = order.status[order.status.length - 1];
        if (currentStatus.boolStatus !== null) {
            return res.status(400).json({ message: `Order has already been ${currentStatus.boolStatus ? 'accepted' : 'rejected'}.` });
        }

        if (action === 'accept') {
            // Update the last status object in the array
            order.status[order.status.length - 1] = { boolStatus: true };
            order.estimatedTime = estimatedTime;
            // Delivery status implicitly starts preparing after acceptance
            order.deliveryStatus = "Preparing Order"; 
        } else { // reject
            // Update the last status object in the array
            order.status[order.status.length - 1] = { boolStatus: false, rejectionNote: rejectionNote || "Kitchen unable to fulfill order." };
            order.deliveryStatus = "Rejected by Kitchen";
        }

        const updatedOrder = await order.save();

        // Placeholder for Notification Logic (e.g., to the customer)

        res.status(200).json(updatedOrder);
    } catch (error) {
        res.status(500).json({ message: "Server error updating order status.", error: error.message });
    }
};

/**
 * @desc Update the delivery status of an order
 * @route PATCH /api/orders/:orderId/delivery
 * @access Private (Owner, Admin)
 */
export const updateDeliveryStatus = async (req, res) => {
    const { newDeliveryStatus } = req.body;
    const { orderId } = req.params;
    
    const validStatuses = ["Pending", "Preparing Order", "Ready for Pickup", "Order Picked Up", "Order Delivered", "Cancelled"];

    if (!validStatuses.includes(newDeliveryStatus)) {
        return res.status(400).json({ message: `Invalid delivery status. Must be one of: ${validStatuses.join(', ')}.` });
    }

    try {
        const order = await Order.findById(orderId);
        
        if (!order) {
            return res.status(404).json({ message: "Order not found." });
        }
       console.log("Order's Kitchen ID:", order);
        // Authorization Check
       if (req.user.role !== 'admin') {
    if (!order.kitchen) {
        return res.status(400).json({ order: order, message: "Kitchen reference not found for this order." });
    }
  
    const ownsKitchen = await checkKitchenOwnership(order.kitchen._id, req.user._id);
    if (!ownsKitchen) {
        return res.status(403).json({ message: "Not authorized to update this order's delivery status." });
    }
}


        // Prevent updating delivery status if the order was rejected
        const lastStatus = order.status[order.status.length - 1];
        if (lastStatus.boolStatus === false) {
             return res.status(400).json({ message: "Cannot update delivery status for a rejected order." });
        }
        
        // Prevent changing status if the order is already Delivered
         if (order.deliveryStatus === "Order Delivered") {
             return res.status(400).json({ message: "Order is already marked as delivered." });
        }

        order.deliveryStatus = newDeliveryStatus;

        const updatedOrder = await order.save();
        
        // Placeholder for Notification Logic (e.g., to the customer)

        res.status(200).json(updatedOrder);
    } catch (error) {
        res.status(500).json({ message: "Server error updating delivery status.", error: error.message });
    }
};

export const getOrdersByUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const orders = await Order.find({ user: userId })
      .populate("kitchen", "name address") // only return useful fields
      .populate("dishes.dishId", "name price"); // populate dish details

    return res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching user's orders:", error);
    res.status(500).json({ message: "Server error fetching orders" });
  }
};