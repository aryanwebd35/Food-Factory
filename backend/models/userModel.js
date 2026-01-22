// Import mongoose to define schema and interact with MongoDB
import mongoose from "mongoose";

// Define the schema for storing user-related data
const userSchema = new mongoose.Schema({

    // User's full name
    name: { type: String, required: true },

    // User's email address (must be unique)
    email: { type: String, required: true, unique: true },

    // Encrypted password for login authentication
    password: { type: String, required: true },

    // User's cart information (stored as an object)
    cartData: { type: Object, default: {} }

}, { 
    // Prevents Mongoose from removing empty objects
    minimize: false 
});

// Create or reuse an existing 'user' model
const userModel = mongoose.models.user || mongoose.model("user", userSchema);

// Export the model to be used in authentication, cart, etc.
export default userModel;



/* -----------------------------------------
   ✅ FILE SUMMARY
   This file defines the MongoDB schema for users.
   Each user has:
   - name
   - unique email
   - encrypted password
   - cartData (to store cart items client-side)

   ✅ LIBRARIES USED
   - mongoose: For schema modeling and database CRUD operations

   ✅ KEY CONCEPTS
   - Schema fields with validations (required, unique)
   - `minimize: false` ensures empty objects like cartData remain stored
   - Conditional model creation (prevents redefinition errors)

-------------------------------------------- */
