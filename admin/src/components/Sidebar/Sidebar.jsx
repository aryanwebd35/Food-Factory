// Importing React to define a functional component
import React from 'react'

// Importing CSS file for sidebar styling
import  './Sidebar.css'

// Importing image assets like icons used in sidebar options
import { assets } from '../../assets/assets'

// Importing NavLink from React Router to enable active link styling and routing
import { NavLink } from 'react-router-dom'

// Defining the Sidebar functional component
const Sidebar = () => {
  return (
    // Wrapper div for the entire sidebar
    <div className='sidebar'>
      
      {/* Container for all sidebar options/links */}
      <div className="sidebar-options">
        
        {/* NavLink to navigate to the 'Add Items' page; shows icon and label */}
        <NavLink to='/add' className="sidebar-option">
            <img src={assets.add_icon} alt="" />  {/* Add icon */}
            <p>Add Items</p>                      {/* Label */}
        </NavLink>

        {/* NavLink to navigate to the 'List Items' page */}
        <NavLink to='/list' className="sidebar-option">
            <img src={assets.order_icon} alt="" />  {/* Reused icon for list */}
            <p>List Items</p>                        {/* Label */}
        </NavLink>

        {/* NavLink to navigate to the 'Orders' page */}
        <NavLink to='/orders' className="sidebar-option">
            <img src={assets.order_icon} alt="" />  {/* Reused icon for orders */}
            <p>Orders</p>                           {/* Label */}
        </NavLink>

      </div>
    </div>
  )
}

// Exporting the Sidebar component to be used elsewhere (like in Admin Dashboard)
export default Sidebar
