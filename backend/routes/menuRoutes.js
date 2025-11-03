import express from "express";
import {
  addMenu,
  editMenu,
  getMenuByKitchen,
  addSection
} from "../controllers/menuController.js";
import { protect, authorize } from "../middleware/auth.js";
import { uploadMultiple } from "../middleware/upload.js";

const router = express.Router();

// Owner can add a new menu
router.post("/", protect, authorize(["owner"]), uploadMultiple,addMenu);

// Owner can edit an existing menu
router.put("/:kitchenId", protect, authorize(["owner"]), editMenu);

// Anyone can view menu by kitchen
router.get("/:kitchenId", getMenuByKitchen);

router.post('/:kitchenId/sections',protect, authorize(["owner"]),addSection);

export default router;
