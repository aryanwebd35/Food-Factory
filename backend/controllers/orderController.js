// Importing required models and Stripe API
import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// -----------------------------------------
// 🔧 Configuration Variables
// -----------------------------------------
const currency = "inr";
const deliveryCharge = 50;
const frontend_URL = "https://food-factory-frontend-6kt6.onrender.com/";


// -----------------------------------------
// 🛒 Place Order - Online Payment (Stripe)
// -----------------------------------------
const placeOrder = async (req, res) => {
    try {
        // Step 1: Save order in database (initial status unpaid)
        const newOrder = new orderModel({
            userId: req.body.userId,
            items: req.body.items,
            amount: req.body.amount,
            address: req.body.address,
        });
        await newOrder.save();

        // Step 2: Clear the user's cart
        await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

        // Step 3: Convert items into Stripe line_items
        const line_items = req.body.items.map((item) => ({
            price_data: {
                currency: currency,
                product_data: { name: item.name },
                unit_amount: item.price * 100, //  amount in paise
            },
            quantity: item.quantity,
        }));

        // Step 4: Add delivery charges as a separate item
        line_items.push({
            price_data: {
                currency: currency,
                product_data: { name: "Delivery Charge" },
                unit_amount: deliveryCharge * 100,
            },
            quantity: 1,
        });

        // Step 5: Create Stripe checkout session
        const session = await stripe.checkout.sessions.create({
            success_url: `${frontend_URL}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${frontend_URL}/verify?success=false&orderId=${newOrder._id}`,
            line_items,
            mode: 'payment',
        });

        // Step 6: Return the Stripe session URL to frontend
        res.json({ success: true, session_url: session.url });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
};

// -----------------------------------------
// ✅ Stripe Webhook-like Verification
// Called after Stripe redirect to confirm payment success
// -----------------------------------------
const verifyOrder = async (req, res) => {
    const { orderId, success } = req.body;
    try {
        if (success === "true") {
            // Mark payment as completed
            await orderModel.findByIdAndUpdate(orderId, { payment: true });
            res.json({ success: true, message: "Paid" });
        } else {
            // Remove the unpaid order
            await orderModel.findByIdAndDelete(orderId);
            res.json({ success: false, message: "Not Paid" });
        }
    } catch (error) {
        res.json({ success: false, message: "Not Verified" });
    }
};

// -----------------------------------------
// 💵 Place Order - Cash On Delivery
// -----------------------------------------
const placeOrderCod = async (req, res) => {
    try {
        // Directly create and mark payment as true (COD assumed confirmed)
        const newOrder = new orderModel({
            userId: req.body.userId,
            items: req.body.items,
            amount: req.body.amount,
            address: req.body.address,
            payment: true,
        });
        await newOrder.save();

        // Clear the user's cart
        await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

        res.json({ success: true, message: "Order Placed" });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
};


// -----------------------------------------
// 📋 Admin - List All Orders
// -----------------------------------------
const listOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({});
        res.json({ success: true, data: orders });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
};


// -----------------------------------------
// 👤 User - Get Own Orders
// -----------------------------------------
const userOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({ userId: req.body.userId });
        res.json({ success: true, data: orders });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
};


// -----------------------------------------
// 🔄 Admin - Update Order Status (e.g. Delivered, Cancelled)
// -----------------------------------------
const updateStatus = async (req, res) => {
    try {
        await orderModel.findByIdAndUpdate(req.body.orderId, {
            status: req.body.status,
        });
        res.json({ success: true, message: "Status Updated" });
    } catch (error) {
        res.json({ success: false, message: "Error" });
    }
};




// -----------------------------------------
// 📦 Exporting All Controller Functions
// -----------------------------------------
export {
    placeOrder,
    placeOrderCod,
    listOrders,
    userOrders,
    updateStatus,
    verifyOrder,
};



/* -----------------------------------------------------
✅ FILE SUMMARY

Controllers:
- placeOrder(): Places an order via Stripe, sets up payment session
- placeOrderCod(): Places an order as Cash On Delivery (COD)
- listOrders(): Admin route to list all orders
- userOrders(): Show user's own order history
- updateStatus(): Admin can update delivery status
- verifyOrder(): Called after Stripe success/failure to confirm payment

Stripe logic:
- Amounts multiplied by 100 because Stripe expects currency in smallest units (paise)
- Delivery charge is added as a separate product
- Success/cancel URLs redirect back to frontend with query params for order ID and payment status

Database:
- Models used: orderModel, userModel
- On successful order: cartData is cleared

------------------------------------------------------ */
