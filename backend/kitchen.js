import mongoose from "mongoose";
import dotenv from "dotenv";
import Kitchen from '../backend/models/kitchen.js';

dotenv.config(); 


const ownerId = "6905e98bbaf6f05fee399b1c"; 

async function seedKitchen() {
  try {
        mongoose.connect(process.env.MONGO_URI)
        .then(() => console.log('MongoDB connected successfully!'))
        .catch(err => console.error('MongoDB connection error:', err));

    // Kitchen Data
    const kitchenData = {
      owner: ownerId,
      name: "Spice Villa",
      address: "Bandra West, Mumbai, Maharashtra, India",
      location: {
        lat: 19.0596,
        lng: 72.8295,
      },
      cuisineType: ["Indian", "North Indian", "Street Food"],
      deliveryRadius: 8,
      notes: "Authentic homemade Indian meals ✔",
      
      photos: {
        ownerSubmitted: [
          {
            url: "https://example.com/photos/spice-villa-1.jpg",
          },
        ],
        adminVerified: [],
      },

      documents: [
        {
          name: "FSSAI License",
          url: "https://example.com/docs/fssai.pdf",
          verified: false,
        },
      ],

      verification: {
        hygieneStandardsMet: false,
        foodCertificationsValid: false,
        equipmentConditionGood: false,
        addressVerified: false,
        photoVerification: false,
        notes: "",
        verified: false,
        verifiedBy: null,
      },

      isActive: true,
    };

    const kitchen = await Kitchen.create(kitchenData);
    console.log("✅ Kitchen seeded successfully:", kitchen._id);

    process.exit(0);
  } catch (error) {
    console.error("Seeding failed:", error);
    process.exit(1);
  }
}

seedKitchen();
