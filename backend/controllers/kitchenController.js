import Kitchen from '../models/kitchen.js';
import path from 'path';
import fs from 'fs';
import mongoose from 'mongoose';
export const createKitchen = async (req, res) => {
  try {
    let ownerSubmittedPhotos = [];
    console.log('Request Body:', req.files);
    if (req.files && req.files.length > 0) {
      console.log('Uploaded Files:', req.files);
      ownerSubmittedPhotos = req.files.map(file => {
        const uploadsIndex = file.path.indexOf(path.sep + 'uploads' + path.sep);
        const relativeUploadsPath = file.path.substring(uploadsIndex + 8);
        const publicPath = '/uploads/' + relativeUploadsPath.replace(/\\/g, '/');
        return { url: publicPath, localPath: file.path };
      });
    }

    
   const kitchenData = {
  ...req.body,
  owner: req.user._id,  
  photos: {
    ownerSubmitted: [],
    adminVerified: [],
  },
};

    // Step 2: Save kitchen first (we need its _id for folder naming)
    const newKitchen = new Kitchen(kitchenData);
    const savedKitchen = await newKitchen.save();

    // Step 3: Move images from temp to permanent folder
    const ownerId = req.user?._id?.toString() || 'guest';
    const kitchenId = savedKitchen._id.toString();

    const permanentDir = path.join(process.cwd(), 'uploads', 'kitchens', kitchenId);
    if (!fs.existsSync(permanentDir)) fs.mkdirSync(permanentDir, { recursive: true });

    const updatedPhotos = [];

    for (const photo of ownerSubmittedPhotos) {
      const tempFilePath = photo.localPath;
      const fileName = path.basename(tempFilePath);
      const newFilePath = path.join(permanentDir, fileName);
   

      // Move file from temp → permanent
      fs.renameSync(tempFilePath, newFilePath);

      
      const newPublicURL = '/uploads/kitchens/' + `${kitchenId}/${fileName}`;
      updatedPhotos.push({ url: newPublicURL });
    }

    // Step 4: Update kitchen document with final photo URLs
    savedKitchen.photos.ownerSubmitted = updatedPhotos;
    await savedKitchen.save();

    // Step 5: Optionally cleanup temp folder for this user
    const ownerTempDir = path.join(process.cwd(), 'uploads', 'temp', ownerId);
    if (fs.existsSync(ownerTempDir)) {
      const remainingFiles = fs.readdirSync(ownerTempDir);
      if (remainingFiles.length === 0) fs.rmdirSync(ownerTempDir, { recursive: true });
    }

    res.status(201).json(savedKitchen);
  } catch (error) {
    console.error('Kitchen Creation Error:', error);
    if (error.name === 'ValidationError') {
      return res.status(400).json({ error: error.message, details: error.errors });
    }
    res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }
};


export const deleteKitchen = async (req, res) => {
  try {
    const { kitchenId } = req.params;
    await Kitchen.findByIdAndDelete(kitchenId);
    res.status(200).json({ message: "Kitchen deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAllKitchens = async (req, res) => {
  try {
    const kitchens = await Kitchen.find();
    res.status(200).json(kitchens);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export const  getKitchenById = async (req, res) => {
  try {
    const { kitchenId } = req.params;
    const kitchen = await Kitchen.findById(kitchenId);
    if (!kitchen) return res.status(404).json({ message: "Kitchen not found" });
    res.status(200).json(kitchen);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export const getKitchenByOwner = async (req, res) => { 
  try {
    const { ownerId } = req.params;
    
 
    if (!mongoose.Types.ObjectId.isValid(ownerId)) {
      return res.status(400).json({ error: 'Invalid owner ID format' });
    }
    
    const kitchen = await Kitchen.findOne({ owner: ownerId });
    console.log('Kitchen found:', kitchen);
    
    if (!kitchen) {
      return res.status(404).json({ 
        error: 'Kitchen not found',
        searchedFor: ownerId 
      });
    }
    
    res.status(200).json(kitchen);
  } catch (error) {
    console.error('Error in getKitchenByOwner:', error);
    res.status(500).json({ error: error.message });
  }   
}