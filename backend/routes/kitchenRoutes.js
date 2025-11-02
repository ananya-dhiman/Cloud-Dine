import express from "express";
import {
  createKitchen,
  deleteKitchen,
  getAllKitchens,
  getKitchenById,
  getKitchenByOwner
} from "../controllers/kitchenController.js";
import { protect, authorize } from "../middleware/auth.js";
import { uploadMultiple } from "../middleware/upload.js";
import { get } from "mongoose";

const router = express.Router();

/**
 * @route   POST /api/kitchens
 * @desc    Owner can add a new kitchen (with image upload)
 * @access  Private (owner only)
 */
router.post("/", protect, authorize(["owner"]), uploadMultiple, createKitchen);

/**
 * @route   DELETE /api/kitchens/:kitchenId
 * @desc    Delete a kitchen
 * @access  Private (owner or admin)
 */
router.delete("/:kitchenId", protect, authorize(["owner", "admin"]), deleteKitchen);

/**
 * @route   GET /api/kitchens
 * @desc    All kitchens 
 * @access  Private (admin only)
 */
router.get("/", protect, getAllKitchens);

/**
 * @route   GET /api/kitchens/:kitchenId
 * @desc    Any logged-in user can view a single kitchen
 * @access  Private (all logged-in users)
 */
router.get("/:kitchenId", protect, getKitchenById);
router.get("/owner/:ownerId", protect, authorize(["owner"]),getKitchenByOwner);
export default router;
