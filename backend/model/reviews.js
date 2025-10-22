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

// reviewSchema.statics.updateKitchenRating = async function (kitchenId) {
//   const stats = await this.aggregate([
//     { $match: { kitchen: kitchenId } },
//     {
//       $group: {
//         _id: "$kitchen",
//         averageRating: { $avg: "$rating" },
//         totalReviews: { $sum: 1 },
//       },
//     },
//   ]);

//   const Kitchen = mongoose.model("Kitchen");
//   if (stats.length > 0) {
//     await Kitchen.findByIdAndUpdate(kitchenId, {
//       $set: {
//         "verification.verifiedAt": new Date(), // optional — shows recent activity
//       },
//       $setOnInsert: {},
//     });
//     // Update average and count fields (if you want to store them for quick access)
//     await Kitchen.findByIdAndUpdate(kitchenId, {
//       averageRating: stats[0].averageRating,
//       totalReviews: stats[0].totalReviews,
//     });
//   } else {
//     await Kitchen.findByIdAndUpdate(kitchenId, {
//       averageRating: 0,
//       totalReviews: 0,
//     });
//   }
// };



export default mongoose.model("Review", reviewSchema);
