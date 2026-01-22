// Importing required hooks and modules from React and other libraries
import React, { useEffect, useState } from 'react'                  // useEffect: Run code on mount | useState: Manage component state
import './List.css'                                                // Importing component-specific CSS
import { url, currency } from '../../assets/assets'                // Getting the base URL and currency symbol from a central file
import axios from 'axios';                                         // Axios is used to make HTTP requests to backend API
import { toast } from 'react-toastify';                            // Toasts show success or error notifications to user

const List = () => {

  // Creating a state variable `list` to hold the food items fetched from backend
  const [list, setList] = useState([]);

  // Function to fetch food list from the backend
  const fetchList = async () => {
    const response = await axios.get(`${url}/api/food/list`)       // Sending GET request to fetch food list
    if (response.data.success) {
      setList(response.data.data);                                 // On success, updating list state with received food data
    }
    else {
      toast.error("Error")                                         // On failure, showing error message
    }
  }

  // Function to remove a food item by ID
  const removeFood = async (foodId) => {
    const response = await axios.post(`${url}/api/food/remove`, {
      id: foodId                                                   // Sending the food ID to backend for deletion
    })
    await fetchList();                                             // Refreshing the food list after deletion
    if (response.data.success) {
      toast.success(response.data.message);                        // Show success toast if deletion successful
    }
    else {
      toast.error("Error")                                         // Show error toast if something went wrong
    }
  }

  // useEffect hook runs once when component loads
  useEffect(() => {
    fetchList();                                                   // Automatically fetch the food list on component mount
  }, [])                                                           // Empty dependency array = run only once

  return (
    <div className='list add flex-col'>
      <p>All Foods List</p>
      <div className='list-table'>
        <div className="list-table-format title">
          <b>Image</b>                                              {/* Table headers */}
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {/* Looping through all food items and rendering each as a row */}
        {list.map((item, index) => {
          return (
            <div key={index} className='list-table-format'>
              <img src={`${url}/images/` + item.image} alt="" />   {/* Food image */}
              <p>{item.name}</p>                                   {/* Food name */}
              <p>{item.category}</p>                               {/* Food category */}
              <p>{currency}{item.price}</p>                        {/* Food price with currency */}
              <p className='cursor' onClick={() => removeFood(item._id)}>x</p>  {/* Remove button */}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default List;  // Exporting the component for usage in the app


// File Purpose:
// This component displays a list of all food items in a table format and allows the admin to remove any item from the list.

// Main Features:

// useEffect: Automatically fetches data on component load.

// axios: Used to make API calls to fetch and delete food items.

// useState: Maintains the local state for food list.

// toast: Gives success/error popups when API actions are performed.

// map(): Renders each item dynamically from the list array.

// 📚 Libraries Used:
// axios → For making HTTP API calls.

// react-toastify → To show success/error toast messages.

// react hooks (useState, useEffect) → For state and lifecycle management.
// */