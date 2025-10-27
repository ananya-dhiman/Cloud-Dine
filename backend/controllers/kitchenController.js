import Kitchen from "../models/kitchen.js";

export const createKitchen = async (req, res) => {
  try {
    const newKitchen = new Kitchen(req.body);
    const savedKitchen = await newKitchen.save();
    res.status(201).json(savedKitchen);
  } catch (error) {
    res.status(500).json({ error: error.message });
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
export const getKitchenById = async (req, res) => {
  try {
    const { kitchenId } = req.params;
    const kitchen = await Kitchen.findById(kitchenId);
    if (!kitchen) return res.status(404).json({ message: "Kitchen not found" });
    res.status(200).json(kitchen);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
