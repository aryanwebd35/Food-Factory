// Import the food model to interact with the "food" collection in MongoDB
import foodModel from "../models/foodModel.js";

// Import Node.js file system module to handle image deletion
import fs from 'fs';


// -----------------------------------------
// 🍽️ Get the list of all food items
// -----------------------------------------
const listFood = async (req, res) => {
    try {
        // Fetch all food documents from the DB
        const foods = await foodModel.find({});
        
        // Send them in response
        res.json({ success: true, data: foods });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
};


// -----------------------------------------
// ➕ Add a new food item to the DB
// -----------------------------------------
const addFood = async (req, res) => {
    try {
        // Get image file name from uploaded file (via multer)
        let image_filename = `${req.file.filename}`;

        // Create a new food object using request body
        const food = new foodModel({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            category: req.body.category,
            image: image_filename,
        });

        // Save the new food document to the database
        await food.save();

        // Respond with success
        res.json({ success: true, message: "Food Added" });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
};


// -----------------------------------------
// ❌ Delete a food item by ID
// -----------------------------------------
const removeFood = async (req, res) => {
    try {
        // First find the food item by ID
        const food = await foodModel.findById(req.body.id);

        // Delete the associated image file from the uploads folder
        fs.unlink(`uploads/${food.image}`, () => {});

        // Delete the food document from DB
        await foodModel.findByIdAndDelete(req.body.id);

        // Respond with success message
        res.json({ success: true, message: "Food Removed" });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
};


// Export all controller functions
export { listFood, addFood, removeFood };



/* -----------------------------------------
   ✅ FILE SUMMARY
   This file includes the following controllers:
   - listFood(): Get all food items from the DB
   - addFood(): Add a new food item along with an image
   - removeFood(): Delete a food item and remove the associated image file

   ✅ LIBRARIES & CONCEPTS USED
   - `mongoose`: For DB interactions via `foodModel`
   - `fs (file system)`: To delete uploaded image files from the server
   - `multer` (assumed): For file uploads (`req.file.filename`)
   - Express.js route handling and response pattern

   ✅ REVISION NOTES
   - When adding food, multer stores the image and filename is saved in DB
   - When deleting food, the image file must also be removed from `/uploads/`
   - All controllers use async/await and try/catch for error handling

-------------------------------------------- */
