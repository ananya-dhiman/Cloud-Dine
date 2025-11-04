import express from "express";
import {
  addMenu,
  addDish,
  getMenuByKitchen,
  getDishById,
  addSection
} from "../controllers/menuController.js";
import { protect, authorize } from "../middleware/auth.js";

import uploadMiddleware from "../middleware/upload.js";

const router = express.Router();


router.get("/dish/:dishId", protect, getDishById);

// Owner can add a new menu
router.post("/", protect, authorize(["owner"]), uploadMiddleware,addMenu);

// Owner can edit an existing menu
router.post(
  "/:kitchenId/dishes", 
  protect, 
  authorize(["owner"]), 
  uploadMiddleware,  
  addDish
);

// Anyone can view menu by kitchen
router.get("/:kitchenId", getMenuByKitchen);

router.post('/:kitchenId/sections',protect, authorize(["owner"]),addSection);

export default router;
