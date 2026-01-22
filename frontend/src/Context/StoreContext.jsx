// Importing necessary hooks and context from React
import { createContext, useEffect, useState } from "react"

// Importing dummy food and menu data (used as backup/fallback)
import { food_list, menu_list } from "../assets/assets"

// Axios is a library used to make HTTP API requests (get/post)
import axios from "axios"

// Creating a new context that can be shared across components
export const StoreContext = createContext(null)

const StoreContextProvider = (props) => {

    // Backend API base URL (used to fetch food items, cart, etc.)
    const url = import.meta.env.VITE_API_URL || "http://localhost:4000";

    // Stores the food item list fetched from backend
    const [food_list, setFoodList] = useState([])

    // Stores items added to cart in format: { itemId: quantity }
    const [cartItems, setCartItems] = useState({})

    // Stores the JWT token of logged-in user (used for protected API calls)
    const [token, setToken] = useState("")

    // Currency symbol used throughout the app (₹)
    const currency = "₹"

    // Flat delivery fee added to total price
    const deliveryCharge = 50

    // Function to add item to cart
    const addToCart = async (itemId) => {
        // If item not in cart, add it with quantity 1
        if (!cartItems[itemId]) {
            setCartItems((prev) => ({ ...prev, [itemId]: 1 }))
        }
        // If already in cart, increase its quantity by 1
        else {
            setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }))
        }

        // If user is logged in, sync the cart to backend
        if (token) {
            await axios.post(url + "/api/cart/add", { itemId }, { headers: { token } })
        }
    }

    // Function to remove 1 quantity of an item from cart
    const removeFromCart = async (itemId) => {
        // Decrease item quantity by 1
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }))

        // If user is logged in, also update backend
        if (token) {
            await axios.post(url + "/api/cart/remove", { itemId }, { headers: { token } })
        }
    }

    // Function to calculate the total price of items in the cart
    const getTotalCartAmount = () => {
        let totalAmount = 0 // initialize total

        // Loop through all items in cart
        for (const item in cartItems) {
            try {
                // Only calculate if quantity is more than 0
                if (cartItems[item] > 0) {
                    // Find item details (price) from food list using ID
                    let itemInfo = food_list.find((product) => product._id === item)

                    // Multiply price × quantity and add to total
                    totalAmount += itemInfo.price * cartItems[item]
                }
            } catch (error) {
                // If item not found in food list (edge case), ignore it
            }
        }
        return totalAmount // Return final amount
    }

    // Function to fetch food items from backend
    const fetchFoodList = async () => {
        // API call to get food list
        const response = await axios.get(url + "/api/food/list")

        // Save fetched food data into state
        setFoodList(response.data.data)
    }

    // Function to load cart data from backend (if user is logged in)
    const loadCartData = async (token) => {
        // API call to get user's saved cart
        const response = await axios.post(url + "/api/cart/get", {}, { headers: token })

        // Save cart data into local state
        setCartItems(response.data.cartData)
    }

    // useEffect runs only once when component mounts
    useEffect(() => {
        // Define async function to load data
        async function loadData() {
            await fetchFoodList() // Get food items from backend

            // If token is saved in localStorage (user is logged in)
            if (localStorage.getItem("token")) {
                setToken(localStorage.getItem("token")) // Save token to state
                await loadCartData({ token: localStorage.getItem("token") }) // Load cart
            }
        }

        // Call the async function
        loadData()
    }, []) // Empty dependency array => runs only once

    // Create object containing all shared values and functions
    const contextValue = {
        url,                  // API base URL
        food_list,            // Food items
        menu_list,            // Static menu categories (pizza, burger, etc.)
        cartItems,            // Cart state (itemId: quantity)
        addToCart,            // Add item function
        removeFromCart,       // Remove item function
        getTotalCartAmount,   // Calculate cart total
        token,                // Auth token
        setToken,             // Function to set token
        loadCartData,         // Load user's cart
        setCartItems,         // Manually update cart (if needed)
        currency,             // ₹ symbol
        deliveryCharge        // Flat delivery fee
    }

    return (
        // Make context data available to all child components
        <StoreContext.Provider value={contextValue}>
            {props.children} {/* Render children inside context */}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider



// 🔸 This file defines StoreContext, which shares global data and functions across the app.

// ✅ It handles:
// - Fetching food items from the backend
// - Managing cart state locally and on the server
// - Keeping track of user authentication via JWT token
// - Providing utility functions like calculating cart total

// 🔁 On app load:
// - Fetch food list
// - If token exists → Load user's cart from server

// 📦 Shared via Context:
// - food_list, cartItems
// - addToCart(), removeFromCart()
// - getTotalCartAmount()
// - token, setToken()
// - deliveryCharge, currency

// ⚙️ Why use Context here?
// To avoid prop drilling and allow any component (like FoodItem, Cart, etc.) to access shared data like cart items, price, etc., directly.

// 🛒 Example use cases:
// - `FoodItem` uses `addToCart`, `removeFromCart`, `cartItems`
// - `Cart` uses `cartItems`, `getTotalCartAmount`, `deliveryCharge`
