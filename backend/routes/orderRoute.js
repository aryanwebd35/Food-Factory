import express from 'express';
import authMiddleware from '../middleware/auth.js';
import { 
  listOrders, 
  placeOrder, 
  updateStatus, 
  userOrders, 
  verifyOrder, 
  placeOrderCod 
} from '../controllers/orderController.js';

const orderRouter = express.Router();

// Admin: List all orders
orderRouter.get("/list", listOrders);

// Authenticated User: Get their order history
orderRouter.post("/userorders", authMiddleware, userOrders);

// Authenticated User: Place an order using Stripe
orderRouter.post("/place", authMiddleware, placeOrder);

// Admin/User: Update delivery/payment status
orderRouter.post("/status", updateStatus);

// Stripe redirect hits this to verify and finalize payment
orderRouter.post("/verify", verifyOrder);

// Authenticated User: Place a Cash-On-Delivery order
orderRouter.post("/placecod", authMiddleware, placeOrderCod);

export default orderRouter;

/* -----------------------------------------
   ✅ FILE SUMMARY
   This file defines all routes related to orders:
   - GET `/list`: Lists all orders (for admin)
   - POST `/userorders`: Returns logged-in user's orders
   - POST `/place`: Places an order via Stripe
   - POST `/status`: Updates the order delivery status
   - POST `/verify`: Verifies Stripe payment and updates the DB
   - POST `/placecod`: Places a cash-on-delivery order

   ✅ LIBRARIES & CONCEPTS USED
   - `express.Router`: For route grouping and modular routing
   - `authMiddleware`: Protects user-specific routes
   - Order-related controller functions from `orderController.js`

   ✅ REVISION NOTES
   - All `/userorders`, `/place`, and `/placecod` routes are protected with JWT auth
   - Separate routes exist for Stripe and COD order placement
   - Admin-only route (`/list`) is currently unprotected — consider securing it
-------------------------------------------- */
