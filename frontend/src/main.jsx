// React core library
import React from 'react'

// Renders React app to the DOM
import ReactDOM from 'react-dom/client'

// Main app component
import App from './App.jsx'

// Global CSS file
import './index.css'

// For routing (switching between pages without reload)
import { BrowserRouter } from 'react-router-dom'

// Context API -> Avoid prop drilling (share data like cart/user across components)
import StoreContextProvider from './Context/StoreContext'

// Clerk Authentication Provider
import { ClerkProvider } from '@clerk/clerk-react'

// Import your publishable key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")
}

// Rendering the app inside the 'root' div in index.html
ReactDOM.createRoot(document.getElementById('root')).render(
  <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
    <BrowserRouter>
      {/* Context Provider -> Makes shared state available to all components */}
      <StoreContextProvider>
        {/* Loads the entire app */}
        <App />
      </StoreContextProvider>
    </BrowserRouter>
  </ClerkProvider>
)
