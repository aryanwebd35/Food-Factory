// Import express to create routes
import express from 'express';

// Import controller functions that handle cart logic
import { addToCart, getCart, removeFromCart } from '../controllers/cartController.js';

// Import authentication middleware to protect routes
import authMiddleware from '../middleware/auth.js';

// Create a new router instance for cart-related routes
const cartRouter = express.Router();

// Route to get items in user's cart (protected by auth middleware)
cartRouter.post("/get", authMiddleware, getCart);

// Route to add an item to cart (protected by auth middleware)
cartRouter.post("/add", authMiddleware, addToCart);

// Route to remove an item from cart (protected by auth middleware)
cartRouter.post("/remove", authMiddleware, removeFromCart);

// Export the router to use in main server file
export default cartRouter;



/* -----------------------------------------
   ✅ FILE SUMMARY
   This file defines API routes for cart operations:
   - /get     → Get current cart
   - /add     → Add item to cart
   - /remove  → Remove item from cart

   All routes use `authMiddleware` to ensure only logged-in users access them.

   ✅ LIBRARIES & CONCEPTS USED
   - express: For creating and managing API routes
   - middleware: Used to protect routes (checks user token)
   - MVC architecture: Routes use controller logic from `cartController.js`

   ✅ REVISION TIPS
   - authMiddleware is crucial for route protection
   - All routes are POST even for "get" due to token-based auth in body (common in protected APIs)

-------------------------------------------- */
