// Import React core functions and hooks
import React, { useEffect, useState } from 'react'

// Import CSS for styling this component
import './Orders.css'

// Import toast notifications for success/error messages
import { toast } from 'react-toastify'

// Import Axios for making API calls
import axios from 'axios'

// Import assets, base API URL, and currency symbol from global config
import { assets, url, currency } from '../../assets/assets'

const Order = () => {

  // State to hold all orders retrieved from backend
  const [orders, setOrders] = useState([])

  // Function to fetch all orders from backend
  const fetchAllOrders = async () => {
    // Send GET request to fetch order data
    const response = await axios.get(`${url}/api/order/list`)

    // If request is successful, update state with reversed list (latest first)
    if (response.data.success) {
      setOrders(response.data.data.reverse())
    } else {
      // Show error message using toast if fetch fails
      toast.error("Error")
    }
  }

  // Function to update order status when dropdown changes
  const statusHandler = async (event, orderId) => {
    // Log event and order ID (for debugging)
    console.log(event, orderId)

    // Send POST request to update the order status
    const response = await axios.post(`${url}/api/order/status`, {
      orderId,
      status: event.target.value
    })

    // If update is successful, refresh the orders list
    if (response.data.success) {
      await fetchAllOrders()
    }
  }

  // useEffect to fetch all orders on component mount
  useEffect(() => {
    fetchAllOrders()
  }, [])

  return (
    <div className='order add'>
      {/* Title */}
      <h3>Order Page</h3>

      {/* Main container for all order items */}
      <div className="order-list">

        {/* Loop through each order and render its UI */}
        {orders.map((order, index) => (
          <div key={index} className='order-item'>

            {/* Parcel icon image */}
            <img src={assets.parcel_icon} alt="" />

            {/* Main details container */}
            <div>
              {/* List of ordered items with quantity */}
              <p className='order-item-food'>
                {order.items.map((item, index) => {
                  if (index === order.items.length - 1) {
                    return item.name + " x " + item.quantity
                  } else {
                    return item.name + " x " + item.quantity + ", "
                  }
                })}
              </p>

              {/* Customer's full name */}
              <p className='order-item-name'>
                {order.address.firstName + " " + order.address.lastName}
              </p>

              {/* Customer address in 2 lines */}
              <div className='order-item-address'>
                <p>{order.address.street + ","}</p>
                <p>{order.address.city + ", " + order.address.state + ", " + order.address.country + ", " + order.address.zipcode}</p>
              </div>

              {/* Customer's phone number */}
              <p className='order-item-phone'>{order.address.phone}</p>
            </div>

            {/* Number of items in the order */}
            <p>Items : {order.items.length}</p>

            {/* Total amount for the order */}
            <p>{currency}{order.amount}</p>

            {/* Dropdown to update order status */}
            <select onChange={(e) => statusHandler(e, order._id)} value={order.status}>
              <option value="Food Processing">Food Processing</option>
              <option value="Out for delivery">Out for delivery</option>
              <option value="Delivered">Delivered</option>
            </select>

          </div>
        ))}

      </div>
    </div>
  )
}

// Export this component for use in other parts of the app
export default Order

/* ------------------------------------------------------------------------------------------
   ✅ SUMMARY:
   This component displays all food orders placed by users. It allows admin to:
   - View user name, address, phone, order items, and total
   - Change the order status using a dropdown menu
   - Auto-refresh orders list when status is updated
   - Fetches order data once on page load using useEffect

   🧰 LIBRARIES/HOOKS USED:
   - React: For component and state management
   - useState: To store the list of orders
   - useEffect: To fetch data on initial render
   - axios: For making API requests to the backend
   - react-toastify: To show success/error messages (like a popup)
   - .map(): To dynamically render each order and its items
   - select/onChange: To update the status of each order
--------------------------------------------------------------------------------------------- */
