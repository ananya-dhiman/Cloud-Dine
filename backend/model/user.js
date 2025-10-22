import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: ["user", "owner", "admin"],
      default: "user",
    },

    location: {
      type: {
        address: String,
        city: String,
        state: String,
        pincode: String,
        coordinates: {
          lat: Number,
          lng: Number,
        },
      },
      default: {},
    },

    phone: {
      type: String,
    },

    
    ownedKitchen: {
      type: Schema.Types.ObjectId,
      ref: "Kitchen", 
      default: null,
    },

 
    permissions: {
      type: [String],
      default: [], 
    },
  },
  { timestamps: true }
);


userSchema.methods.isOwner = function () {
  return this.role === "owner";
};

userSchema.methods.isAdmin = function () {
  return this.role === "admin";
};

export default mongoose.model("User", userSchema);
