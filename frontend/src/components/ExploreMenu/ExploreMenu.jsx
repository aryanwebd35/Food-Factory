// Import React and useContext hook to consume context values
import React, { useContext } from 'react'

// Import component-specific CSS
import './ExploreMenu.css'

// Importing StoreContext to access shared menu data
import { StoreContext } from '../../Context/StoreContext'

// Functional component with props: category and setCategory (from Home.jsx)
const ExploreMenu = ({ category, setCategory }) => {

  // Accessing menu_list from global context (e.g., Pizza, Burger, etc.)
  const { menu_list } = useContext(StoreContext)
  
  return (
    // Main wrapper for the explore menu section
    <div className='explore-menu' id='explore-menu'>
      
      {/* Section title */}
      <h1>Explore our menu</h1>

      {/* Description text under the title */}
      <p className='explore-menu-text'>
        Choose from a diverse menu featuring a delectable array of dishes. 
        Our mission is to satisfy your cravings and elevate your dining experience, one delicious meal at a time.
      </p>

      {/* Menu item list rendered from context */}
      <div className="explore-menu-list">
        {menu_list.map((item, index) => {
          return (
            // Each menu item is clickable; clicking toggles the selected category
            <div 
              onClick={() => setCategory(prev => prev === item.menu_name ? "All" : item.menu_name)} 
              key={index} 
              className='explore-menu-list-item'
            >
              {/* Menu image with "active" class applied if currently selected */}
              <img 
                src={item.menu_image} 
                className={category === item.menu_name ? "active" : ""} 
                alt="" 
              />

              {/* Menu name text */}
              <p>{item.menu_name}</p>
            </div>
          )
        })}
      </div>

      {/* Horizontal line for visual separation */}
      <hr />
    </div>
  )
}

export default ExploreMenu


// -------------------------
// 📄 Summary:
// -------------------------
// 🔸 This component shows a list of food categories (like Pizza, Burger, etc.).
// 🔸 It allows the user to **filter food items** by selecting a category.
// 🔸 The selected category updates the state in the Home component using `setCategory`.
// 🔸 Menu data (image + name) is pulled from the global context `StoreContext`.
//
// ✅ Related Terms:
// - `useContext()`: React hook to access shared state across components
// - `menu_list`: Array of menu categories from context
// - `setCategory()`: Function to update selected category in parent
// - `props`: Data passed from parent to child component (category, setCategory here)
// - `active` class: Adds styling to the selected category
// -------------------------
