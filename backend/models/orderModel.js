// Import mongoose for interacting with MongoDB
import mongoose from "mongoose";

// Define the schema for order documents
const orderSchema = new mongoose.Schema({

    // ID of the user who placed the order
    userId: { type: String, required: true },

    // Array of food items in the order (each item includes name, quantity, etc.)
    items: { type: Array, required: true },

    // Total amount for the order
    amount: { type: Number, required: true },

    // Address object including full delivery address details
    address: { type: Object, required: true },

    // Current status of the order (default is "Food Processing")
    status: { type: String, default: "Food Processing" },

    // Timestamp when the order was placed (default is current date/time)
    date: { type: Date, default: Date.now() },

    // Boolean value to check if payment is done (true/false)
    payment: { type: Boolean, default: false }
});

// Create the model if it doesn't already exist (avoids redefinition during development)
const orderModel = mongoose.models.order || mongoose.model("order", orderSchema);

// Export the model to be used in routes or controllers
export default orderModel;



/* -----------------------------------------
   ✅ FILE SUMMARY
   This file defines the MongoDB schema and model for food orders.
   Each order stores:
   - User ID
   - List of ordered items
   - Total amount
   - Delivery address
   - Order status (e.g., Processing, Delivered)
   - Timestamp
   - Payment status (paid/unpaid)

   ✅ LIBRARIES USED
   - mongoose: For schema definition and database operations

   ✅ KEY CONCEPTS
   - Schema and model creation
   - Default values for fields
   - Ensuring unique model declaration
-------------------------------------------- */
