import express from 'express'; // Importing Express framework
import { loginUser, registerUser, googleLogin } from '../controllers/userController.js'; // Importing controller functions

// Creating a router instance for user-related routes
const userRouter = express.Router();

// Route to handle user registration
userRouter.post("/register", registerUser);

// Route to handle user login
userRouter.post("/login", loginUser);

// Route for Google Login
userRouter.post("/google-login", googleLogin);

// Exporting the router to be used in main app
export default userRouter;

/* -----------------------------------------
   ✅ FILE SUMMARY
   This file defines user-related authentication routes:
   - POST `/register`: Registers a new user
   - POST `/login`: Authenticates user and returns token

   ✅ LIBRARIES & CONCEPTS USED
   - `express.Router`: For modular routing
   - `userController.js`: Contains logic for registration and login

   ✅ REVISION NOTES
   - Simple and secure routing pattern
   - Use of controller functions keeps code clean
   - Authentication logic (like hashing, token generation) handled in controller
-------------------------------------------- */
