import Menu from "../models/menu.js";


import fs from "fs";
import path from "path";
  
export const addMenu = async (req, res) => {
  try {
    // Step 1: Collect uploaded images from multer
    let uploadedImages = [];
    if (req.files && req.files.length > 0) {
      uploadedImages = req.files.map((file) => {
        const uploadsIndex = file.path.indexOf(path.sep + "uploads" + path.sep);
        const relativeUploadsPath = file.path.substring(uploadsIndex + 8);
        const publicPath = "/static/" + relativeUploadsPath.replace(/\\/g, "/");
        return { url: publicPath, localPath: file.path };
      });
    }

    // Step 2: Create a new menu document (without final image URLs yet)
    const newMenu = new Menu(req.body);
    const savedMenu = await newMenu.save();

    const menuId = savedMenu._id.toString();
    const ownerId = req.user?._id?.toString() || "guest";

    // Step 3: Make permanent directory
    const permanentDir = path.join(process.cwd(), "uploads", "menus", menuId);
    if (!fs.existsSync(permanentDir))
      fs.mkdirSync(permanentDir, { recursive: true });

    // Step 4: Move uploaded images → permanent folder
    const movedImages = [];
    for (const img of uploadedImages) {
      const tempFilePath = img.localPath;
      const fileName = path.basename(tempFilePath);
      const newFilePath = path.join(permanentDir, fileName);

      fs.renameSync(tempFilePath, newFilePath);

      const newPublicURL = `/static/menus/${menuId}/${fileName}`;
      movedImages.push(newPublicURL);
    }

    // Step 5: Assign dish images (if order matches files uploaded)
    // Example logic: each uploaded image maps to a dish in order
    let dishIndex = 0;
    savedMenu.sections.forEach((section) => {
      section.dishes.forEach((dish) => {
        if (movedImages[dishIndex]) {
          dish.image = movedImages[dishIndex];
          dishIndex++;
        }
      });
    });

    // Step 6: Save updated menu with new image URLs
    await savedMenu.save();

    // Step 7: Clean up user’s temp folder
    const ownerTempDir = path.join(process.cwd(), "uploads", "temp", ownerId);
    if (fs.existsSync(ownerTempDir)) {
      const remainingFiles = fs.readdirSync(ownerTempDir);
      if (remainingFiles.length === 0)
        fs.rmdirSync(ownerTempDir, { recursive: true });
    }

    res.status(201).json(savedMenu);
  } catch (error) {
    console.error("Menu Creation Error:", error);
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
    