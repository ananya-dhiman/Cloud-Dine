// // middleware/upload.js
// import multer from 'multer';
// import path from 'path';
// import fs from 'fs';

// const rootUploadDir = path.join(process.cwd(), 'uploads');
// const tempDir = path.join(rootUploadDir, 'temp');

// if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir, { recursive: true });

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     // Temporarily store files in uploads/temp/<ownerId> before kitchen exists
//     const ownerId = req.user?._id?.toString() || 'guest';
//     const ownerTempDir = path.join(tempDir, ownerId);
//     if (!fs.existsSync(ownerTempDir)) fs.mkdirSync(ownerTempDir, { recursive: true });
//     cb(null, ownerTempDir);
//   },
//   filename: function (req, file, cb) {
//     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
//     const ext = path.extname(file.originalname);
//     const baseName = path.basename(file.originalname, ext);
//     cb(null, `${baseName}-${uniqueSuffix}${ext}`);
//   },
// });

// const fileFilter = (req, file, cb) => {
//   const allowed = ['image/jpeg', 'image/png', 'image/webp'];
//   if (!allowed.includes(file.mimetype)) {
//     return cb(new Error('Only JPEG, PNG, and WEBP images are allowed'));
//   }
//   cb(null, true);
// };

// const upload = multer({
//   storage,
//   fileFilter,
//   limits: { fileSize: 5 * 1024 * 1024 },
// });

// export const uploadMultiple = upload.array('images', 10);
// export default upload;
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
dotenv.config();
// 🔹 Cloudinary config check
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

console.log("🧾 Cloudinary env check:", {
  CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME ? "✅" : "❌ MISSING",
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY ? "✅" : "❌ MISSING",
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET ? "✅" : "❌ MISSING",
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    try {
      console.log("📸 Preparing upload params for:", file.originalname, file.mimetype);
      return {
        folder: "cloud-dine/kitchens",
        allowed_formats: ["jpg", "jpeg", "png", "webp"],
        transformation: [{ width: 800, height: 800, crop: "limit" }],
      };
    } catch (err) {
      console.error("❌ CloudinaryStorage params error:", err);
      throw err;
    }
  },
});

const uploadMultiple = multer({ storage }).array("photos", 10);

// ✅ Wrap multer middleware to log before and after
const uploadMiddleware = (req, res, next) => {
  console.log("🚀 Starting file upload...");
  uploadMultiple(req, res, (err) => {
    if (err) {
      console.error("💥 Multer/Cloudinary upload error:", err);
      return res.status(500).json({
        success: false,
        message: "Image upload failed",
        error: err.message,
      });
    }

    console.log("✅ Upload finished. Files received:", req.files?.length || 0);
    if (req.files?.length) {
      req.files.forEach((f, i) => {
        console.log(`   [${i + 1}] ${f.originalname} → ${f.path}`);
      });
    } else {
      console.warn("⚠️ No files attached in request!");
    }

    next();
  });
};

export default uploadMiddleware;
