import express from "express";
import {
  addMenu,
  editMenu,
  getMenuByKitchen,
} from "../controllers/menuController.js";

const router = express.Router();

router.post("/", addMenu);
router.put("/:kitchenId", editMenu);
router.get("/:kitchenId", getMenuByKitchen);

export default router;
