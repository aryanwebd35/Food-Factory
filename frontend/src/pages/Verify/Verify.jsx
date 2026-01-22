// Importing axios for sending HTTP requests to the backend
import axios from 'axios';
// Importing React and its hooks
import React, { useContext, useEffect } from 'react'
// Importing React Router hooks to handle navigation and query parameters
import { useNavigate, useSearchParams } from 'react-router-dom'
// Importing global context to get backend URL
import { StoreContext } from '../../Context/StoreContext';
// Importing CSS for styling the loading spinner
import './Verify.css'

// Functional component to verify the payment status
const Verify = () => {
  // Extract the base URL from the global context
  const { url } = useContext(StoreContext)

  // Hook to access URL search parameters (like success and orderId from Stripe)
  const [searchParams, setSearchParams] = useSearchParams();

  // Extracting success status and orderId from the URL
  const success = searchParams.get("success")
  const orderId = searchParams.get("orderId")

  // Hook for programmatic navigation
  const navigate = useNavigate();

  // Function to verify payment by sending info to backend
  const verifyPayment = async () => {
    // Call the backend endpoint with the success status and order ID
    const response = await axios.post(url + "/api/order/verify", { success, orderId });

    // If backend verifies the payment, redirect to orders page
    if (response.data.success) {
      navigate("/myorders");
    }
    // If something goes wrong, redirect back to homepage
    else {
      navigate("/")
    }
  }

  // useEffect runs once when the component is first rendered
  useEffect(() => {
    verifyPayment();  // Call the verification function as soon as user lands on this page
  }, [])

  return (
    // UI displayed while waiting for payment to verify
    <div className='verify'>
      <div className="spinner"></div> {/* A loading spinner animation */}
    </div>
  )
}

// Export the component so it can be used in routing
export default Verify
