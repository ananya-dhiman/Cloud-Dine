import Review from "../models/reviews.js";
import Kitchen from "../models/kitchen.js";

export const addReview = async (req, res) => {
  try {
    const { kitchenId, userId, userName, rating, reviewText } = req.body;

    
    if (!kitchenId || !userId || !userName || rating == null) {
      return res.status(400).json({ message: "Missing required fields." });
    }

    
    const kitchenExists = await Kitchen.findById(kitchenId);
    if (!kitchenExists) {
      return res.status(404).json({ message: "Kitchen not found." });
    }

    
    const review = new Review({
      kitchen: kitchenId,
      user: userId,
      userName,
      rating,
      reviewText,
    });

    await review.save();

    
    const allReviews = await Review.find({ kitchen: kitchenId });
    const avgRating =
      allReviews.reduce((acc, curr) => acc + curr.rating, 0) /
      allReviews.length;

    kitchenExists.avgRating = avgRating;
    await kitchenExists.save();

    res.status(201).json({
      message: "Review added successfully!",
      review,
    });
  } catch (error) {
    console.error("Error adding review:", error);
    res.status(500).json({ message: "Internal server error", error });
  }
};


export const getReviewsByKitchen = async (req, res, next) => {
    try {
        const { kitchenId } = req.params;

       
        const reviews = await Review.find({ kitchen: kitchenId })
            .populate('user', 'name') // Optionally populate the user's name
            .sort({ createdAt: -1 }); // Get the newest reviews first

        if (!reviews || reviews.length === 0) {
            return res.status(404).json({ message: "No reviews found for this kitchen." });
        }

        res.status(200).json(reviews);
    } catch (err) {
        next(err);
    }
};