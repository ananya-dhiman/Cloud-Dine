import Menu from "../models/menu.js";


import fs from "fs";
import path from "path";
  
export const addMenu = async (req, res) => {
  try {
    console.log("📦 Raw req.body:", req.body);
    console.log("📸 Raw req.files:", req.files);

    // Step 1: Get uploaded Cloudinary URLs
    const uploadedImages = (req.files || []).map((file) => file.path);
    console.log("✅ Uploaded Cloudinary URLs:", uploadedImages);

    // Step 2: Parse sections properly
    let sections = [];
    if (req.body.sections) {
      if (typeof req.body.sections === "string") {
        try {
          sections = JSON.parse(req.body.sections);
          console.log("✅ Parsed sections from string:", sections);
        } catch (e) {
          console.error("❌ Failed to parse sections JSON:", e);
          console.error("❌ Raw sections value:", req.body.sections);
          return res.status(400).json({ 
            message: "Invalid sections JSON format",
            error: e.message 
          });
        }
      } else if (Array.isArray(req.body.sections)) {
        sections = req.body.sections;
        console.log("✅ Sections already an array:", sections);
      } else {
        console.error("❌ Unexpected sections type:", typeof req.body.sections);
        return res.status(400).json({ 
          message: "Sections must be an array or JSON string" 
        });
      }
    }

    // Step 3: Validate sections structure
    if (!Array.isArray(sections)) {
      console.error("❌ Sections is not an array after parsing:", sections);
      return res.status(400).json({ 
        message: "Sections must be an array" 
      });
    }

    console.log("🔍 Final sections to save:", JSON.stringify(sections, null, 2));

    const { kitchen, lastUpdatedBy } = req.body;

    // Step 4: Create menu with parsed sections
    const newMenu = new Menu({
      kitchen,
      lastUpdatedBy,
      sections, // Now properly parsed as array
    });

    console.log("💾 Attempting to save menu...");
    await newMenu.save();
    console.log("✅ Menu saved successfully!");

    // Step 5: Assign uploaded images in order
    let imgIndex = 0;
    newMenu.sections.forEach((section) => {
      section.dishes.forEach((dish) => {
        if (uploadedImages[imgIndex]) {
          dish.image = uploadedImages[imgIndex];
          imgIndex++;
        }
      });
    });

    await newMenu.save();
    console.log("✅ Images assigned to dishes!");

    res.status(201).json({
      message: "✅ Menu created successfully with Cloudinary images!",
      menu: newMenu,
    });
  } catch (error) {
    console.error("❌ Menu Creation Error:", error);
    console.error("❌ Error name:", error.name);
    console.error("❌ Error message:", error.message);
    if (error.errors) {
      console.error("❌ Validation errors:", error.errors);
    }
    res.status(500).json({ 
      error: error.message,
      name: error.name,
      details: error.errors 
    });
  }
};
export const addDish = async (req, res) => {
  try {
    const { kitchenId } = req.params;
    const { name, description, price, isAvailable, sectionId } = req.body;

    console.log("📦 Add Dish Request Body:", req.body);
    console.log("📸 Uploaded Files:", req.files);

    // Validate required fields
    if (!name || !price || !sectionId) {
      return res.status(400).json({ 
        message: "Missing required fields: name, price, or sectionId" 
      });
    }

    // Find the menu
    const menu = await Menu.findOne({ kitchen: kitchenId });
    if (!menu) {
      return res.status(404).json({ message: "Menu not found" });
    }

    // Find the section
    const section = menu.sections.id(sectionId);
    if (!section) {
      return res.status(404).json({ message: "Section not found" });
    }

    // Get uploaded image URL (if any)
    const imageUrl = req.files && req.files.length > 0 
      ? req.files[0].path 
      : null;

    console.log("🖼️ Image URL:", imageUrl);

    // Create new dish object
    const newDish = {
      name,
      description: description || "",
      price: parseFloat(price),
      isAvailable: isAvailable === "true" || isAvailable === true,
      image: imageUrl,
    };

    console.log("🍽️ New Dish Object:", newDish);

    // Add dish to section
    section.dishes.push(newDish);

    // Save menu
    await menu.save();

    console.log("✅ Dish added successfully!");

    res.status(200).json(menu);
  } catch (error) {
    console.error("❌ Error adding dish:", error);
    res.status(500).json({ 
      error: error.message,
      details: error.errors 
    });
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
     
export const addSection = async (req, res) => {
  try {
    const { kitchenId } = req.params;
    const { title } = req.body;

    const menu = await Menu.findOne({ kitchen: kitchenId });
    if (!menu) return res.status(404).json({ message: "Menu not found" });

    menu.sections.push({ title });
    await menu.save();

    res.status(200).json(menu);
  } catch (error) {
    console.error("Error adding section:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getDishById = async (req, res) => {
  try {
    const { dishId } = req.params;

    // Search through all menus’ sections and dishes
    const menu = await Menu.findOne({ "sections.dishes._id": dishId });

    if (!menu) {
      return res.status(404).json({ message: "Dish not found in any menu" });
    }

    // Find the actual section and dish
    let foundDish = null;
    for (const section of menu.sections) {
      const dish = section.dishes.id(dishId);
      if (dish) {
        foundDish = dish;
        break;
      }
    }

    if (!foundDish) {
      return res.status(404).json({ message: "Dish not found" });
    }

    res.status(200).json(foundDish);
  } catch (error) {
    console.error("Error fetching dish:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};