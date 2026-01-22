import React, { useContext, useEffect, useState } from 'react' // Importing hooks from React
import './MyOrders.css' // CSS styling specific to MyOrders component
import axios from 'axios' // For making API requests
import { StoreContext } from '../../Context/StoreContext'; // Accessing global app data via Context API
import { assets } from '../../assets/assets'; // Static assets (like images/icons)

const MyOrders = () => {

  // Local state to store order data fetched from the backend
  const [data, setData] = useState([]);

  // Destructuring required values from context
  const { url, token, currency } = useContext(StoreContext);

  // Fetch orders from the backend (only for the logged-in user)
  const fetchOrders = async () => {
    const response = await axios.post(
      url + "/api/order/userorders", // Endpoint for getting user-specific orders
      {},                            // Empty body as no data is required
      { headers: { token } }         // Token passed in headers for authorization
    );
    setData(response.data.data);     // Save fetched orders into local state
  }

  // Fetch orders on component mount or whenever the token changes
  useEffect(() => {
    if (token) {
      fetchOrders();
    }
  }, [token]);

  return (
    <div className='my-orders'>
      <h2>My Orders</h2>
      <div className="container">
        {/* Iterate over each order and display it */}
        {data.map((order, index) => {
          return (
            <div key={index} className='my-orders-order'>
                <img src={assets.parcel_icon} alt="" /> {/* Order icon */}

                {/* Display item names and their quantities */}
                <p>{order.items.map((item, index) => {
                  if (index === order.items.length - 1) {
                    return item.name + " x " + item.quantity
                  } else {
                    return item.name + " x " + item.quantity + ", "
                  }
                })}</p>

                {/* Order total amount */}
                <p>{currency}{order.amount}.00</p>

                {/* Number of items in this order */}
                <p>Items: {order.items.length}</p>

                {/* Order status with a dot indicator */}
                <p><span>&#x25cf;</span> <b>{order.status}</b></p>

                {/* Refresh button to re-fetch orders (could be replaced with actual tracking later) */}
                <button onClick={fetchOrders}>Track Order</button>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default MyOrders


/* --------------------------------------------------
   ✅ Summary of MyOrders.jsx Component

1. Purpose:
   - Displays all previous orders made by the logged-in user.

2. Functionality:
   - Fetches user orders from the backend using an axios `POST` request.
   - Authorization is handled via the token from context.
   - Orders are displayed with item details, quantity, total cost, and status.

3. Key Libraries Used:
   - `axios`: For making API calls.
   - `useContext`: Access shared global state like token, currency, and base URL.
   - `useState`, `useEffect`: For local state and triggering fetch on mount.

4. Output:
   - List of all orders with total items, amount, and status (e.g., "Delivered", "Pending").
   - Includes a Track Order button (currently just re-fetches data).

-------------------------------------------------- */
