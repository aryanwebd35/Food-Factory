// Core React import
import React, { useState, useEffect } from 'react'

// Importing different pages and components
import Home from './pages/Home/Home'
import Footer from './components/Footer/Footer'
import Navbar from './components/Navbar/Navbar'

// React Router components to handle routing (URLs)
import { Route, Routes } from 'react-router-dom'

// Other pages used in routing
import Cart from './pages/Cart/Cart'
import LoginPopup from './components/LoginPopup/LoginPopup'
import PlaceOrder from './pages/PlaceOrder/PlaceOrder'
import MyOrders from './pages/MyOrders/MyOrders'
import Verify from './pages/Verify/Verify'

// Toast library to show popup notifications
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useUser } from '@clerk/clerk-react';
import { useContext } from 'react';
import { StoreContext } from './Context/StoreContext';
import axios from 'axios';

const App = () => {
  // State to show/hide login popup
  const [showLogin, setShowLogin] = useState(false)

  // Theme state
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    document.body.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const { user } = useUser();
  const { url, setToken, loadCartData } = useContext(StoreContext);

  useEffect(() => {
    const syncUser = async () => {
      if (user) {
        if (!localStorage.getItem("token")) {
          try {
            const response = await axios.post(url + "/api/user/google-login", {
              email: user.primaryEmailAddress.emailAddress,
              name: user.fullName,
              googlePhoto: user.imageUrl
            });

            if (response.data.success) {
              setToken(response.data.token);
              localStorage.setItem("token", response.data.token);
              loadCartData({ token: response.data.token });
            }
          } catch (error) {
            console.error("Error syncing user:", error);
          }
        }
      } else {
        // User is signed out in Clerk, clear local token
        if (localStorage.getItem("token")) {
          setToken("");
          localStorage.removeItem("token");
        }
      }
    };
    syncUser();
  }, [user, url, setToken, loadCartData]);

  return (
    <>
      {/* Toasts container -> Displays notifications */}
      <ToastContainer />

      {/* Show login popup if 'showLogin' is true */}
      {showLogin ? <LoginPopup setShowLogin={setShowLogin} /> : <></>}

      <div className='app'>
        {/* Navbar -> top menu bar, passes setShowLogin to toggle login popup */}
        <Navbar setShowLogin={setShowLogin} theme={theme} toggleTheme={toggleTheme} />

        {/* Routes -> Handles page switching without reload */}
        <Routes>
          {/* Home page -> '/' */}
          <Route path='/' element={<Home />} />

          {/* Cart page -> '/cart' */}
          <Route path='/cart' element={<Cart />} />

          {/* Order placing page -> '/order' */}
          <Route path='/order' element={<PlaceOrder />} />

          {/* My Orders -> user’s previous orders */}
          <Route path='/myorders' element={<MyOrders />} />

          {/* Verify -> e.g., OTP or email verification */}
          <Route path='/verify' element={<Verify />} />
        </Routes>
      </div>

      {/* Footer -> bottom section of the site */}
      <Footer />
    </>
  )
}

export default App
