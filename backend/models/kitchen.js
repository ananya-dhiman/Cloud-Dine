    import mongoose from "mongoose";

    const { Schema } = mongoose;

    const kitchenSchema = new Schema(
    {
        owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
        },

        name: {
        type: String,
        required: true,
        trim: true,
        },

        address: {
        type: String,
        required: true,
        },

        location: {
        lat: {
            type: Number,
            required: true,
        },
        lng: {
            type: Number,
            required: true,
        },
        },

        cuisineType: {
        type: [String],
        required: true,
        },

        deliveryRadius: {
        type: Number,
        default: 5,
        },

        notes: {
        type: String,
        trim: true,
        },

        
        photos: {
        ownerSubmitted: [
            {
            url: String,
            uploadedAt: { type: Date, default: Date.now },
            },
        ],
        adminVerified: [
            {
            url: String,
            uploadedAt: { type: Date, default: Date.now },
            },
        ],
        },

        documents: [
        {
            name: { type: String, required: true }, 
            url: { type: String, required: true }, 
            uploadedAt: { type: Date, default: Date.now },
            verified: { type: Boolean, default: false }, 
        },
        ],

        verification: {
        hygieneStandardsMet: { type: Boolean, default: false },
        foodCertificationsValid: { type: Boolean, default: false },
        equipmentConditionGood: { type: Boolean, default: false },
        addressVerified: { type: Boolean, default: false },
        photoVerification: { type: Boolean, default: false },
        notes: { type: String, default: "" },
        verified: { type: Boolean, default: false },
        verifiedAt: { type: Date },
        verifiedBy: {
            type: Schema.Types.ObjectId,
            ref: "User", 
        },
        },


        isActive: {
        type: Boolean,
        default: true,
        },
    },
    { timestamps: true }
    );


    export default mongoose.model("Kitchen", kitchenSchema);
