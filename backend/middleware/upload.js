// middleware/upload.js
import multer from 'multer';
import path from 'path';
import fs from 'fs';

const rootUploadDir = path.join(process.cwd(), 'uploads');
const tempDir = path.join(rootUploadDir, 'temp');

if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir, { recursive: true });

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Temporarily store files in uploads/temp/<ownerId> before kitchen exists
    const ownerId = req.user?._id?.toString() || 'guest';
    const ownerTempDir = path.join(tempDir, ownerId);
    if (!fs.existsSync(ownerTempDir)) fs.mkdirSync(ownerTempDir, { recursive: true });
    cb(null, ownerTempDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    const baseName = path.basename(file.originalname, ext);
    cb(null, `${baseName}-${uniqueSuffix}${ext}`);
  },
});

const fileFilter = (req, file, cb) => {
  const allowed = ['image/jpeg', 'image/png', 'image/webp'];
  if (!allowed.includes(file.mimetype)) {
    return cb(new Error('Only JPEG, PNG, and WEBP images are allowed'));
  }
  cb(null, true);
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 },
});

export const uploadMultiple = upload.array('images', 10);
export default upload;
