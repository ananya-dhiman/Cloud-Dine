import mongoose from "mongoose";

const { Schema } = mongoose;

const orderSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    kitchen: {
      type: Schema.Types.ObjectId,
      ref: "Kitchen",
      required: true,
    },
    dishes: [
      {
        dishId: {
          type: Schema.Types.ObjectId,
          required: true,

        },
        quantity: {
          type: Number,
          required: true,
          min: 1,
          default: 1,
        },
      },
    ],
    totalAmount: {
      type: Number,
      required: true,
      min: 0,
    },
    status: {
      type: Boolean,
      default: null, // null = pending, true = accepted, false = rejected
    },
    rejectionNote: {
      type: String,
      trim: true,
      default: "", 
    },
    estimatedTime: {
      type: String,
      trim: true,
      default: "",
    },
    deliveryStatus: {
      type: String,
   
      default: "Pending",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);
