import Menu from "../models/menu.js";


export const addMenu = async (req, res) => {
  try {
    const newMenu = new Menu(req.body); 
    const savedMenu = await newMenu.save();
    res.status(201).json(savedMenu);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const editMenu = async (req, res) => {
  try {
    const { kitchenId } = req.params;
    const updatedMenu = await Menu.findOneAndUpdate(
      { kitchen: kitchenId },
      { $set: req.body }, 
      { new: true, runValidators: true }
    );
    if (!updatedMenu) return res.status(404).json({ message: "Menu not found" });
    res.status(200).json(updatedMenu);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getMenuByKitchen = async (req, res) => {
  try {
    const { kitchenId } = req.params;
    const menu = await Menu.findOne({ kitchen: kitchenId });
    if (!menu) return res.status(404).json({ message: "Menu not found" });
    res.status(200).json(menu);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
    