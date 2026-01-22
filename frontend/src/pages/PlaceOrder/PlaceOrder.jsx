// Import React-related functions and hooks
import React, { useContext, useEffect, useState } from 'react'
// Import CSS specific to this component
import './PlaceOrder.css'
// Import global context for shared data and functions
import { StoreContext } from '../../Context/StoreContext'
// Import assets like images/icons
import { assets } from '../../assets/assets';
// Hook to navigate between routes programmatically
import { useNavigate } from 'react-router-dom';
// For showing success or error pop-ups
import { toast } from 'react-toastify';
// For making HTTP requests
import axios from 'axios';

const PlaceOrder = () => {

    // State to store selected payment method, default is 'Cash On Delivery'
    const [payment, setPayment] = useState("cod")

    // Form data for address and contact details
    const [data, setData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        street: "",
        city: "",
        state: "",
        zipcode: "",
        country: "",
        phone: ""
    })

    // Destructuring values from StoreContext
    const { getTotalCartAmount, token, food_list, cartItems, url, setCartItems, currency, deliveryCharge } = useContext(StoreContext);

    // To navigate programmatically to different routes
    const navigate = useNavigate();

    // Handles form input changes and updates state accordingly
    const onChangeHandler = (event) => {
        const name = event.target.name        // Field name (e.g., 'email')
        const value = event.target.value      // User's typed value
        // Update only the changed field, keeping the rest intact
        setData(data => ({ ...data, [name]: value }))
    }

    // Function to handle placing the order
    const placeOrder = async (e) => {
        e.preventDefault();  // Prevents form default reload on submit

        let orderItems = []; // Will hold list of all ordered food items

        // Loop through food_list to find items that have quantity > 0 in cart
        food_list.map(((item) => {
            if (cartItems[item._id] > 0) {
                let itemInfo = item;  // Copy item details
                itemInfo["quantity"] = cartItems[item._id]; // Add quantity info
                orderItems.push(itemInfo); // Add to order list
            }
        }))

        // Constructing the final order payload
        let orderData = {
            address: data,  // Delivery info
            items: orderItems, // Food items with quantity
            amount: getTotalCartAmount() + deliveryCharge, // Total payable amount
        }

        // If payment mode is Stripe (online)
        if (payment === "stripe") {
            let response = await axios.post(url + "/api/order/place", orderData, { headers: { token } });
            if (response.data.success) {
                const { session_url } = response.data;
                // Redirect to Stripe payment page
                window.location.replace(session_url);
            } else {
                toast.error("Something Went Wrong"); // Show error toast
            }
        } else {
            // If payment is Cash On Delivery
            let response = await axios.post(url + "/api/order/placecod", orderData, { headers: { token } });
            if (response.data.success) {
                navigate("/myorders"); // Navigate to orders page
                toast.success(response.data.message); // Show success message
                setCartItems({}); // Clear cart after successful order
            } else {
                toast.error("Something Went Wrong"); // Show error
            }
        }
    }

    // Run once when the component is mounted
    useEffect(() => {
        // If user is not logged in, show toast and redirect to cart
        if (!token) {
            toast.error("To place an order, sign in first");
            navigate('/cart');
        }
        // If cart is empty, redirect to cart
        else if (getTotalCartAmount() === 0) {
            navigate('/cart');
        }
    }, [token]);

    return (
        // Main form container
        <form onSubmit={placeOrder} className='place-order'>

            {/* Left Side: User's delivery information */}
            <div className="place-order-left">
                <p className='title'>Delivery Information</p>

                {/* First and Last Name side by side */}
                <div className="multi-field">
                    <input type="text" name='firstName' onChange={onChangeHandler} value={data.firstName} placeholder='First name' required />
                    <input type="text" name='lastName' onChange={onChangeHandler} value={data.lastName} placeholder='Last name' required />
                </div>

                {/* Email input */}
                <input type="email" name='email' onChange={onChangeHandler} value={data.email} placeholder='Email address' required />
                {/* Street address input */}
                <input type="text" name='street' onChange={onChangeHandler} value={data.street} placeholder='Street' required />

                {/* City and State side by side */}
                <div className="multi-field">
                    <input type="text" name='city' onChange={onChangeHandler} value={data.city} placeholder='City' required />
                    <input type="text" name='state' onChange={onChangeHandler} value={data.state} placeholder='State' required />
                </div>

                {/* Zipcode and Country side by side */}
                <div className="multi-field">
                    <input type="text" name='zipcode' onChange={onChangeHandler} value={data.zipcode} placeholder='Zip code' required />
                    <input type="text" name='country' onChange={onChangeHandler} value={data.country} placeholder='Country' required />
                </div>

                {/* Phone number input */}
                <input type="text" name='phone' onChange={onChangeHandler} value={data.phone} placeholder='Phone' required />
            </div>

            {/* Right Side: Cart summary + Payment options */}
            <div className="place-order-right">

                {/* Cart Totals Section */}
                <div className="cart-total">
                    <h2>Cart Totals</h2>
                    <div>
                        <div className="cart-total-details">
                            <p>Subtotal</p>
                            <p>{currency}{getTotalCartAmount()}</p>
                        </div>
                        <hr />
                        <div className="cart-total-details">
                            <p>Delivery Fee</p>
                            <p>{currency}{getTotalCartAmount() === 0 ? 0 : deliveryCharge}</p>
                        </div>
                        <hr />
                        <div className="cart-total-details">
                            <b>Total</b>
                            <b>{currency}{getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + deliveryCharge}</b>
                        </div>
                    </div>
                </div>

                {/* Payment Method Section */}
                <div className="payment">
                    <h2>Payment Method</h2>

                    {/* Option 1: Cash On Delivery */}
                    <div onClick={() => setPayment("cod")} className="payment-option">
                        <img src={payment === "cod" ? assets.checked : assets.un_checked} alt="" />
                        <p>COD ( Cash on delivery )</p>
                    </div>

                    {/* Option 2: Stripe (online) */}
                    <div onClick={() => setPayment("stripe")} className="payment-option">
                        <img src={payment === "stripe" ? assets.checked : assets.un_checked} alt="" />
                        <p>Stripe ( Credit / Debit )</p>
                    </div>
                </div>

                {/* Submit button based on payment type */}
                <button className='place-order-submit' type='submit'>
                    {payment === "cod" ? "Place Order" : "Proceed To Payment"}
                </button>
            </div>
        </form>
    )
}

export default PlaceOrder
