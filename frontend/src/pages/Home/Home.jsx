
// React core and hook to manage state
import React, { useState } from 'react'

// Reusable UI components used in the home page
import Header from '../../components/Header/Header'
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu'
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay'
import AppDownload from '../../components/AppDownload/AppDownload'

const Home = () => {

  // State to track selected food category (default is "All")
  // This controls which food items are shown in FoodDisplay
  const [category, setCategory] = useState("All")

  return (
    <>
      {/* Banner section with welcome message or visual */}
      <Header />

      {/* Menu for selecting food categories like "Pizza", "Burger", etc.
          setCategory: function to change the selected category
          category: current selected category */}
      <ExploreMenu setCategory={setCategory} category={category} />

      {/* Shows food items filtered by selected category */}
      <FoodDisplay category={category} />

      {/* Section to encourage users to download the mobile app */}
      <AppDownload />
    </>
  )
}

export default Home


// -------------------------
// Home.jsx - Home Page Component
// -------------------------
//
// 🔹 Purpose: This is the main homepage for the Food Factory app.
// 🔹 It includes:
//   - Header banner
//   - Category selection (menu)
//   - Food items display (based on category)
//   - App download promotion
//
// 🔹 Key Concepts:
//   - useState(): React hook to manage component state
//   - Props: Passing data between parent and child components
//   - Component: Reusable UI piece (like Header, Footer, etc.)
//
// -------------------------

