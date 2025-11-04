import Kitchen from '../models/kitchen.js';
import path from 'path';
import fs from 'fs';
import mongoose from 'mongoose';

export const createKitchen = async (req, res) => {
  try {
    console.log("req.body:", req.body);
    console.log("req.files:", req.files);

    const ownerSubmittedPhotos =
      req.files?.map((file) => ({
        url: file.path,
        public_id: file.filename,
      })) || [];

    const kitchenData = {
      ...req.body,
      owner: req.user?._id,
      photos: {
        ownerSubmitted: ownerSubmittedPhotos,
        adminVerified: [],
      },
    };

    console.log("kitchenData to save:", kitchenData);

    const newKitchen = new Kitchen(kitchenData);
    const savedKitchen = await newKitchen.save();

    res.status(201).json(savedKitchen);
  } catch (error) {
    console.error("Kitchen Creation Error:", error);
if (error.name === "ValidationError") {
  return res.status(400).json({ error: error.message, details: error.errors });
}

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