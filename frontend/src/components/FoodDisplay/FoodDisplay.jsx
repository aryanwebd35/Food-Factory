// Import core React and useContext hook
import React, { useContext } from 'react'

// Import component-specific styling
import './FoodDisplay.css'

// Import FoodItem component to show individual dish cards
import FoodItem from '../FoodItem/FoodItem'

// Import global food data from context
import { StoreContext } from '../../Context/StoreContext'

// Receives 'category' from Home.jsx to filter food items
const FoodDisplay = ({ category }) => {

  // Get food list (array of dishes) from shared context
  const { food_list } = useContext(StoreContext)

  return (
    // Main container for the food section
    <div className='food-display' id='food-display'>
      
      {/* Section heading */}
      <h2>Top dishes near you</h2>

      {/* Container for displaying food items as a grid/list */}
      <div className='food-display-list'>

        {/* Loop through all food items */}
        {food_list.map((item) => {
          // Show item only if category is "All" or it matches the selected category
          if (category === "All" || category === item.category) {
            return (
              <FoodItem 
                key={item._id}       // Unique ID for React list rendering
                image={item.image}   // Food image
                name={item.name}     // Food name
                desc={item.description} // Food description
                price={item.price}   // Price
                id={item._id}        // ID used for cart operations etc.
              />
            )
          }
        })}
      </div>
    </div>
  )
}

export default FoodDisplay


// -------------------------
// 📄 Summary:
// -------------------------
// 🔸 Displays a grid of food items based on selected category.
// 🔸 Filters data using the `category` prop received from Home page.
// 🔸 Uses data from `StoreContext` (global context).
// 🔸 Each dish is shown using the `FoodItem` component.
//
// ✅ Related Terms:
// - `useContext()`: Hook to access global/shared state
// - `food_list`: Array of all dishes with info (name, image, price, etc.)
// - `category`: Selected food type (e.g., Pizza, Burger), used to filter items
// - `FoodItem`: Component to render a single dish card
// - `map()`: Loops through the food array and renders matching items
// - `key`: A unique identifier for each item in a list (helps React track changes efficiently)
// -------------------------
