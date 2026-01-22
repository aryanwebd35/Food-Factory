// Import the user model to interact with MongoDB user documents
import userModel from "../models/userModel.js";


// ----------------------
// 🛒 Add Item to Cart
// ----------------------
const addToCart = async (req, res) => {
   try {
      // Find user data using userId from token
      let userData = await userModel.findOne({ _id: req.body.userId });

      // Extract the current cart data
      let cartData = await userData.cartData;

      // If item is not in cart, initialize it with quantity 1
      if (!cartData[req.body.itemId]) {
         cartData[req.body.itemId] = 1;
      } 
      // Else, increment the item quantity
      else {
         cartData[req.body.itemId] += 1;
      }

      // Save updated cartData back to the database
      await userModel.findByIdAndUpdate(req.body.userId, { cartData });

      // Respond with success message
      res.json({ success: true, message: "Added To Cart" });

   } catch (error) {
      console.log(error);
      res.json({ success: false, message: "Error" });
   }
};


// --------------------------
// ❌ Remove Item from Cart
// --------------------------
const removeFromCart = async (req, res) => {
   try {
      // Find the user's current cart data
      let userData = await userModel.findById(req.body.userId);
      let cartData = await userData.cartData;

      // Decrease quantity if greater than 0
      if (cartData[req.body.itemId] > 0) {
         cartData[req.body.itemId] -= 1;
      }

      // Save updated cartData
      await userModel.findByIdAndUpdate(req.body.userId, { cartData });

      // Respond with success
      res.json({ success: true, message: "Removed From Cart" });

   } catch (error) {
      console.log(error);
      res.json({ success: false, message: "Error" });
   }
};


// ---------------------
// 📦 Get User Cart Data
// ---------------------
const getCart = async (req, res) => {
   try {
      // Get user’s cart data using ID
      let userData = await userModel.findById(req.body.userId);
      let cartData = await userData.cartData;

      // Respond with cart data
      res.json({ success: true, cartData: cartData });

   } catch (error) {
      console.log(error);
      res.json({ success: false, message: "Error" });
   }
};


// Export all three functions to use in router
export { addToCart, removeFromCart, getCart };




/* -----------------------------------------
   ✅ FILE SUMMARY
   This controller file contains:
   - addToCart(): Adds an item to user's cart (increments quantity)
   - removeFromCart(): Decreases quantity of a specific cart item
   - getCart(): Retrieves the full cart data of a user

   ✅ LIBRARIES & CONCEPTS USED
   - MongoDB (via Mongoose)
   - `userModel`: Access and update user's cart
   - JWT Token decoded in middleware provides `req.body.userId`
   - Express.js request/response pattern

   ✅ REVISION TIPS
   - cartData is an object with itemId as keys and quantity as value
   - Ensure that updates are persisted using `findByIdAndUpdate`
   - Always validate quantity before decreasing to avoid negative counts

-------------------------------------------- */
