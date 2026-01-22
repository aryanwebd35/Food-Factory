// Importing required libraries and user model
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";
import userModel from "../models/userModel.js";

// 🔐 Create a JWT token with user ID as payload
const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET);
}

// 🔑 Login user handler
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        // Check if user exists
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.json({ success: false, message: "User does not exist" });
        }

        // Compare given password with stored hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.json({ success: false, message: "Invalid credentials" });
        }

        // Create and return JWT token if credentials are valid
        const token = createToken(user._id);
        res.json({ success: true, token });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
}

// 📝 Register new user handler
const registerUser = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        // Check if user already exists
        const exists = await userModel.findOne({ email });
        if (exists) {
            return res.json({ success: false, message: "User already exists" });
        }

        // Validate email format
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please enter a valid email" });
        }

        // Check password strength
        if (password.length < 8) {
            return res.json({ success: false, message: "Please enter a strong password" });
        }

        // Hash password before saving
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create and save new user
        const newUser = new userModel({ name, email, password: hashedPassword });
        const user = await newUser.save();

        // Return JWT token
        const token = createToken(user._id);
        res.json({ success: true, token });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
}

// Exporting controller functions
// 🌐 Google Login handler
const googleLogin = async (req, res) => {
    const { email, name, googlePhoto } = req.body;
    try {
        // Check if user exists
        const user = await userModel.findOne({ email });

        if (user) {
            // If user exists, just generate token
            const token = createToken(user._id);
            res.json({ success: true, token });
        } else {
            // New user, create account with random password (they login via Google anyway)
            const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(generatedPassword, salt);

            const newUser = new userModel({
                name: name,
                email: email,
                password: hashedPassword,
                // photo: googlePhoto // If user model has photo field
            });

            const savedUser = await newUser.save();
            const token = createToken(savedUser._id);
            res.json({ success: true, token });
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
}

// Exporting controller functions
export { loginUser, registerUser, googleLogin };

/* -----------------------------------------
   ✅ FILE SUMMARY
   This file defines user authentication controller functions:
   - `loginUser()`: Authenticates a user using email & password, returns token.
   - `registerUser()`: Registers a new user after validations, returns token.

   ✅ LIBRARIES & CONCEPTS USED
   - `jsonwebtoken`: To sign and create authentication tokens.
   - `bcrypt`: For secure password hashing and comparison.
   - `validator`: To ensure valid email format.
   - `mongoose model (userModel)`: For MongoDB user data operations.

   ✅ REVISION NOTES
   - Strong error handling with `try/catch`
   - Validates input before DB operations
   - Reuses token logic via `createToken` function
   - Hashing ensures password security on registration
-------------------------------------------- */
