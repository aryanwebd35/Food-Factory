import React, { useContext, useEffect, useState } from 'react'
// React core imports for using state, effects, and context
import './Navbar.css' // Importing CSS styling specific to Navbar
import { assets } from '../../assets/assets' // Importing image/icon assets
import { Link, useNavigate } from 'react-router-dom' // Link for navigation without reload, useNavigate for programmatic redirects
import { StoreContext } from '../../Context/StoreContext' // Importing global context
import { SignedIn, SignedOut, UserButton, SignInButton } from "@clerk/clerk-react";

// Navbar component receives setShowLogin function as a prop (to open/close login popup)
const Navbar = ({ setShowLogin, theme, toggleTheme }) => {

  const [menu, setMenu] = useState("home"); // State to track which menu tab is active
  const { getTotalCartAmount, token, setToken } = useContext(StoreContext); // Accessing global store values
  const navigate = useNavigate(); // Hook to navigate to different pages programmatically



  return (
    <div className='navbar'>
      {/* Logo redirects to home page */}
      <Link to='/'><img className='logo' src={assets.logo} alt="" /></Link>

      {/* Menu links section */}
      <ul className="navbar-menu">
        {/* Link to Home */}
        <Link to="/" onClick={() => setMenu("home")} className={`${menu === "home" ? "active" : ""}`}>Home</Link>

        {/* Anchor tag scrolls to explore-menu section */}
        <a href='#explore-menu' onClick={() => setMenu("menu")} className={`${menu === "menu" ? "active" : ""}`}>Menu</a>

        {/* Anchor tag scrolls to app-download section */}
        <a href='#app-download' onClick={() => setMenu("mob-app")} className={`${menu === "mob-app" ? "active" : ""}`}>Mobile App</a>

        {/* Anchor tag scrolls to footer section */}
        <a href='#footer' onClick={() => setMenu("contact")} className={`${menu === "contact" ? "active" : ""}`}>Contact Us</a>
      </ul>

      {/* Right-hand side of navbar */}
      <div className="navbar-right">
        {/* Search icon (just an image, no input box here) */}
        <img src={assets.search_icon} alt="" />

        <div className="navbar-theme-toggle" onClick={toggleTheme}>
          {theme === 'light' ? '🌙' : '☀️'}
        </div>

        {/* Cart icon with red dot if cart is not empty */}
        <Link to='/cart' className='navbar-search-icon'>
          <img src={assets.basket_icon} alt="" />
          <div className={getTotalCartAmount() > 0 ? "dot" : ""}></div>
        </Link>

        {/* If user is not logged in, show "sign in" button */}
        {/* Clerk Auth UI */}
        {/* Clerk Auth UI */}
        <SignedOut>
          <SignInButton mode="modal" />
        </SignedOut>

        <SignedIn>
          <div className='navbar-profile'>
            <Link to='/myorders'>
              <img src={assets.bag_icon} alt="Orders" title="My Orders" />
            </Link>
            <UserButton afterSignOutUrl="/" />
          </div>
        </SignedIn>
      </div>
    </div>
  )
}

export default Navbar
