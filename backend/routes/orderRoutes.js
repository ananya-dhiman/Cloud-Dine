

import express from 'express';
import { 
  createOrder, 
  getOrderDetails, 
  getOrdersForKitchen, 
  updateOrderStatus, 
  updateDeliveryStatus 
} from '../controllers/orderController.js';
import { protect,authorize } from '../middleware/auth.js';

const router = express.Router();

// -------------------- Customer Routes --------------------

// Create a new order
router.post('/', protect, createOrder);

// Get order details by ID
router.get('/:orderId', protect, getOrderDetails);

// -------------------- Kitchen Owner/Admin Routes --------------------

// Get all orders for a particular kitchen
router.get('/kitchen/:kitchenId', protect, authorize(["owner", "admin"]), getOrdersForKitchen);

// Update order status (Accept/Reject)
router.patch('/:orderId/status', protect, authorize(["owner", "admin"]), updateOrderStatus);

// Update delivery status
router.patch('/:orderId/delivery', protect, authorize(["owner", "admin"]), updateDeliveryStatus);

export default router;
