// React import to create functional component
import React from 'react'

// Importing CSS styles specific to this component
import './AppDownload.css'

// Importing images (play store & app store icons) from asset folder
import { assets } from '../../assets/assets'

const AppDownload = () => {
    return (
        // Main container for the app download section
        <div className='app-download' id='app-download'>
            <div className="app-download-left">
                <p>For Better Experience Download <br />Food Factory App</p>
                <div className="app-download-platforms">
                    <img onClick={() => alert("App building under progress")} src={assets.play_store} alt="" />
                    <img onClick={() => alert("App building under progress")} src={assets.app_store} alt="" />
                </div>
            </div>
            <div className="app-download-right">
                <img onClick={() => alert("App building under progress")} src={assets.app_mockup} alt="App Mockup" />
            </div>
        </div>
    )
}

export default AppDownload


// -------------------------
// 📄 Summary:
// -------------------------
// 🔸 This component displays a section promoting the Tomato mobile app.
// 🔸 It includes:
//    - A heading encouraging download
//    - Play Store and App Store buttons (with icons)
// 🔸 Used on the Home page
// 🔸 Styling is handled in AppDownload.css
//
// ✅ Related Terms:
// - assets: Object holding image paths for easy access
// - component: Reusable UI block in React
// -------------------------
