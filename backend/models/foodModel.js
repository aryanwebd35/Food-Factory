// Import mongoose for MongoDB object modeling
import mongoose from "mongoose";

// Define the schema for food items
const foodSchema = new mongoose.Schema({
    
    // Name of the food item (e.g., Pizza)
    name: { type: String, required: true },

    // Description of the item (e.g., "Spicy Italian cheese pizza")
    description: { type: String, required: true },

    // Price of the item (number format only)
    price: { type: Number, required: true },

    // Image file name or path stored in DB (uploaded via frontend)
    image: { type: String, required: true },

    // Category of the food (e.g., Salad, Pasta)
    category: { type: String, required: true }
});

// Export the model only if not already created (avoids duplication during hot reload in dev)
const foodModel = mongoose.models.food || mongoose.model("food", foodSchema);

// Exporting the model to use in other files like routes/controllers
export default foodModel;



/* -----------------------------------------
   ✅ FILE SUMMARY
   This file defines the Food schema for MongoDB using mongoose.
   It ensures every food item stored in the database has:
   - name
   - description
   - price
   - image path
   - category
   These fields are required and used for item creation, listing, and deletion.

   ✅ LIBRARIES USED
   - mongoose: For defining schema and interacting with MongoDB

   ✅ KEY CONCEPTS
   - Schema Definition
   - Model Creation
   - Avoid model overwrite during development
-------------------------------------------- */
