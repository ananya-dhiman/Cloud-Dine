import mongoose from "mongoose";

const { Schema } = mongoose;

const dishSchema = new Schema({
     _id: {
    type: Schema.Types.ObjectId,
    default: () => new mongoose.Types.ObjectId(), 
  },  
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  image: {
    type: String, 
  },
  isAvailable: {
    type: Boolean,
    default: true,
  },
});

const sectionSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  dishes: [dishSchema],
});

const menuSchema = new Schema(
  {
    kitchen: {
      type: Schema.Types.ObjectId,
      ref: "Kitchen",
      required: true,
    },
    sections: [sectionSchema],

    lastUpdatedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Menu", menuSchema);
