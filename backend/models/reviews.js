import mongoose from "mongoose";

const { Schema } = mongoose;

const reviewSchema = new Schema(
  {
    kitchen: {
      type: Schema.Types.ObjectId,
      ref: "Kitchen",
      required: true,
    },

    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    userName: {
      type: String,
      required: true,
      trim: true,
    },

    rating: {
      type: Number,
      required: true,
      min: 0,
      max: 5,
    },

    reviewText: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);




export default mongoose.model("Review", reviewSchema);
