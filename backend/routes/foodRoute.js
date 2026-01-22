// -----------------------------------------
// 🌐 Import Required Modules
// -----------------------------------------
import express from 'express'; // Express for routing
import { addFood, listFood, removeFood } from '../controllers/foodController.js'; // Food-related controller functions
import multer from 'multer'; // Middleware for handling file uploads

// Create a new router instance
const foodRouter = express.Router();


// -----------------------------------------
// 🖼️ Multer Configuration for File Uploads
// Stores uploaded images in 'uploads' folder
// Renames each file using current timestamp + original name
// -----------------------------------------
const storage = multer.diskStorage({
    // Directory where files will be saved
    destination: 'uploads',
   
    
    // Rename the uploaded file 
    filename: (req, file, cb) => {
        return cb(null, `${Date.now()}${file.originalname}`);
    }
});

// Initialize multer middleware with custom storage engine
const upload = multer({ storage: storage });


// -----------------------------------------
// 🛣️ Food Routes
// -----------------------------------------

// GET: List all food items (admin + frontend usage)
foodRouter.get("/list", listFood);

// POST: Add a new food item with image upload
// `upload.single('image')` handles one image file with key 'image'
foodRouter.post("/add", upload.single('image'), addFood);

// POST: Remove a food item by ID (or name, depending on controller logic)
foodRouter.post("/remove", removeFood);


// -----------------------------------------
// 📦 Export Router
// -----------------------------------------
export default foodRouter;


/* -----------------------------------------------------
✅ FILE SUMMARY

1. 📁 Route Prefix: `/api/food`
2. 📦 Dependencies:
   - express: To handle HTTP routing
   - multer: To handle multipart/form-data image uploads
3. 🌐 Routes:
   - GET  `/list`      → Returns all food items
   - POST `/add`       → Adds a new food item with image
   - POST `/remove`    → Deletes a food item (based on controller logic)
4. 🖼️ Image Handling:
   - Images stored in local `/uploads` folder
   - Files renamed using `Date.now()` to avoid collisions
   - Handled by multer middleware

------------------------------------------------------ */
