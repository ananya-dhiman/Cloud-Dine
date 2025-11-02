import express from "express";
import { addReview, getReviewsByKitchen } from "../controllers/reviewController.js";
import { protect, authorize } from "../middleware/auth.js";

const router = express.Router();

/**
 * @route   POST /api/reviews/add
 * @desc    Add a review for a kitchen
 * @access  Private (user, admin)
 */
router.post("/add", protect, authorize(["user", "admin"]), addReview);

/**
 * @route   GET /api/reviews/kitchen/:kitchenId
 * @desc    Get all reviews for a specific kitchen
 * @access  Public (anyone can view)
 */
router.get("/kitchen/:kitchenId", getReviewsByKitchen);

export default router;
