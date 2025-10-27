import express from "express";
import {
  createKitchen,
  deleteKitchen,
  getAllKitchens,
  getKitchenById,
} from "../controllers/kitchenController.js";

const router = express.Router();

router.post("/", createKitchen);
router.delete("/:kitchenId", deleteKitchen);
router.get("/", getAllKitchens);
router.get("/:kitchenId", getKitchenById);

export default router;
