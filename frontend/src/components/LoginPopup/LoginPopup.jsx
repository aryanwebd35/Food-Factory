// Importing required React functions and hooks
import React, { useContext, useState } from 'react'

// Importing CSS for styling the login popup
import './LoginPopup.css'

// Importing icons and images from assets
import { assets } from '../../assets/assets'

// Importing global StoreContext for accessing shared data/functions
import { StoreContext } from '../../Context/StoreContext'

// Axios is used to make HTTP requests to backend APIs
import axios from 'axios'

// Toast is used to show popup notifications (errors, success messages)
import { toast } from 'react-toastify'
import { useClerk } from '@clerk/clerk-react'

// Functional component for Login/Signup Popup
const LoginPopup = ({ setShowLogin }) => {

    // Destructuring values from global context
    const { setToken, url, loadCartData } = useContext(StoreContext)

    // Local state to toggle between "Login" and "Sign Up" mode
    const [currState, setCurrState] = useState("Sign Up")

    // Form input state to hold name, email, and password values
    const [data, setData] = useState({
        name: "",      // User's name (used only during sign up)
        email: "",     // User's email
        password: ""   // User's password
    })

    // Function to update form state when inputs change
    const onChangeHandler = (event) => {
        const name = event.target.name        // Field name (name/email/password)
        const value = event.target.value      // Field value
        // Update the corresponding field in `data` state
        setData(data => ({ ...data, [name]: value }))
    }

    // Handles form submission (either login or signup)
    const onLogin = async (e) => {
        e.preventDefault() // Prevent page reload

        let new_url = url; // Start with base API URL

        // Append endpoint depending on login/signup
        if (currState === "Login") {
            new_url += "/api/user/login"      // If logging in, use login API
        } else {
            new_url += "/api/user/register"   // If signing up, use register API
        }

        // Make API call with form data
        const response = await axios.post(new_url, data)

        // If login/signup was successful
        if (response.data.success) {
            setToken(response.data.token) // Set token in React context
            localStorage.setItem("token", response.data.token) // Also store token in localStorage

            // Load cart data using the token (sync cart items)
            loadCartData({ token: response.data.token })

            // Close the login popup
            setShowLogin(false)
        }
        else {
            // Show error toast if login/register failed
            toast.error(response.data.message)
        }
    }







    // Clerk hook
    const clerk = useClerk();

    const googleLogin = () => {
        // Open Clerk sign-in modal
        clerk.openSignIn({});
        // Note: After successful sign-in, the sync logic in App.jsx will handle backend authentication
        setShowLogin(false);
    }

    return (
        // Main login/signup popup container
        <div className='login-popup'>
            {/* Form for login/signup */}
            <form onSubmit={onLogin} className="login-popup-container">

                {/* Top section: title and close button */}
                <div className="login-popup-title">
                    <h2>{currState}</h2> {/* Show either 'Login' or 'Sign Up' */}
                    <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="" /> {/* Close icon */}
                </div>

                {/* Input fields */}
                <div className="login-popup-inputs">
                    {/* Name input only shown for 'Sign Up' */}
                    {currState === "Sign Up"
                        ? <input
                            name='name'
                            onChange={onChangeHandler}
                            value={data.name}
                            type="text"
                            placeholder='Your name'
                            required
                        />
                        : <></>}

                    {/* Email field */}
                    <input
                        name='email'
                        onChange={onChangeHandler}
                        value={data.email}
                        type="email"
                        placeholder='Your email'
                        required
                    />

                    {/* Password field */}
                    <input
                        name='password'
                        onChange={onChangeHandler}
                        value={data.password}
                        type="password"
                        placeholder='Password'
                        required
                    />
                </div>

                {/* Submit button */}
                <button>
                    {/* Button text changes based on login/signup mode */}
                    {currState === "Login" ? "Login" : "Create account"}
                </button>

                {/* Terms and conditions checkbox */}
                <div className="login-popup-condition">
                    <input type="checkbox" required /> {/* Must check to submit */}
                    <p>By continuing, I agree to the terms of use & privacy policy.</p>
                </div>

                {/* Toggle between login and sign up */}
                {currState === "Login"
                    ? <p>
                        Create a new account?
                        <span onClick={() => setCurrState('Sign Up')}> Click here</span>
                    </p>
                    : <p>
                        Already have an account?
                        <span onClick={() => setCurrState('Login')}> Login here</span>
                    </p>
                }
            </form>
            <button className="login-google-btn" onClick={googleLogin} type="button">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/1200px-Google_%22G%22_logo.svg.png" alt="" />
                Continue with Google
            </button>
            <form className="login-popup-container" style={{ display: 'none' }}></form>
        </div>
    )
}

export default LoginPopup
