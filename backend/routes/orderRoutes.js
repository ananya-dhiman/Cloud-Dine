import express from 'express';
import { 
    createOrder, 
    getOrderDetails, 
    getOrdersForKitchen, 
    updateOrderStatus, 
    updateDeliveryStatus 
} from '../controllers/orderController.js';

// Assuming you have middleware functions like protect, ownerOrAdminOnly, etc.
// import { protect, ownerOrAdminOnly } from '../middleware/authMiddleware.js'; 

const router = express.Router();

// ------------------------------------------------------------------
// Customer-Facing Routes
// ------------------------------------------------------------------

// POST /api/orders - Create a new order (POST / add order)
// Access: Private (User)
router.post('/', /* protect, */ createOrder);

// GET /api/orders/:orderId - Get a particular order details by id (GET /:orderId)
// Access: Private (User, Owner, Admin)
router.get('/:orderId', /* protect, */ getOrderDetails); 

// ------------------------------------------------------------------
// Kitchen Owner/Admin Routes
// ------------------------------------------------------------------

// GET /api/orders/kitchen/:kitchenId - Get all orders for a particular kitchen (GET /:kiTCHENId)
// Access: Private (Owner, Admin)
router.get('/kitchen/:kitchenId', /* protect, ownerOrAdminOnly, */ getOrdersForKitchen); 

// PATCH /api/orders/:orderId/status - Update order status (Accept/Reject) (patch/:orderId/status)
// Access: Private (Owner, Admin)
router.patch('/:orderId/status', /* protect, ownerOrAdminOnly, */ updateOrderStatus);

// PATCH /api/orders/:orderId/delivery - Update delivery status (patch /:orderId/delivery)
// Access: Private (Owner, Admin)
router.patch('/:orderId/delivery', /* protect, ownerOrAdminOnly, */ updateDeliveryStatus);


// Note: An additional route to get orders by user (for customer history) would be:
// router.get('/user/:userId', protect, getOrdersByUser); 

export default router;