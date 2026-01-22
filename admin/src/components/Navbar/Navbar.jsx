// Importing React to create the functional component
import React from 'react'

// Importing the CSS file for styling the Navbar component
import './Navbar.css'

// Importing assets like logo and profile image from the assets folder
import { assets } from '../../assets/assets'

// Defining the Navbar functional component
const Navbar = ({ theme, toggleTheme }) => {
  return (
    // The main container div for the navbar
    <div className='navbar'>
      {/* Displaying the app's logo */}
      <img className='logo' src={assets.logo} alt="" />

      {/* Displaying the profile image (could be admin or user icon) */}
      <div className="navbar-right">
        <div className="navbar-theme-toggle" onClick={toggleTheme}>
          {theme === 'light' ? '🌙' : '☀️'}
        </div>
        <img className='profile' src={assets.profile_image} alt="" />
      </div>
    </div>
  )
}

// Exporting the Navbar component so it can be used in other parts of the app
export default Navbar
