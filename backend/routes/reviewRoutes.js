import express from "express";
import { 
    addReview, 
    getReviewsByKitchen 
} from "../controllers/reviewController.js";

const router = express.Router();

router.post("/add", addReview);
router.get("/kitchen/:kitchenId", getReviewsByKitchen);

export default router;