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

const root = ReactDOM.createRoot(document.getElementById('root'));

if (!PUBLISHABLE_KEY) {
  root.render(
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', flexDirection: 'column', textAlign: 'center', fontFamily: 'sans-serif' }}>
      <h1 style={{ color: '#ff4c24' }}>Configuration Missing</h1>
      <p>The <strong>VITE_CLERK_PUBLISHABLE_KEY</strong> is missing.</p>
      <p>Please add it to your <code>frontend/.env</code> file.</p>
    </div>
  )
} else {
  root.render(
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
      <BrowserRouter>
        <StoreContextProvider>
          <App />
        </StoreContextProvider>
      </BrowserRouter>
    </ClerkProvider>
  )
}
