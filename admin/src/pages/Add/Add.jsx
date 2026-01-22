// Importing React and useState hook to manage state
import React, { useState } from 'react'

// Importing custom CSS for styling the Add Item page
import './Add.css'

// Importing shared image assets and backend URL from assets
import { assets, url } from '../../assets/assets';

// Importing axios to make HTTP requests
import axios from 'axios';

// Importing toast from react-toastify to show success or error messages
import { toast } from 'react-toastify';

const Add = () => {

    // State to store selected image file
    const [image, setImage] = useState(false);

    // State to store form input fields: name, description, price, category
    const [data, setData] = useState({
        name: "",
        description: "",
        price: "",
        category: "Salad"  // Default category
    });

    // Function triggered on form submit
    const onSubmitHandler = async (event) => {
        event.preventDefault(); // Prevent default form reload behavior

        // If no image selected, show error and exit
        if (!image) {
            toast.error('Image not selected');
            return null;
        }

        // Prepare form data to send to backend
        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("description", data.description);
        formData.append("price", Number(data.price)); // Convert price to number
        formData.append("category", data.category);
        formData.append("image", image); // Attach image file

        // Send POST request to backend API to add food item
        const response = await axios.post(`${url}/api/food/add`, formData);

        // Handle response
        if (response.data.success) {
            toast.success(response.data.message) // Show success message
            setData({
                name: "",
                description: "",
                price: "",
                category: data.category // Reset form fields
            });
            setImage(false); // Reset image state
        } else {
            toast.error(response.data.message) // Show error message
        }
    }

    // Handles change in form inputs (name, description, category, price)
    const onChangeHandler = (event) => {
        const name = event.target.name;       // Field name (e.g., name, price)
        const value = event.target.value;     // Field value
        // Update corresponding field in data state using spread syntax
        setData(data => ({ ...data, [name]: value }))
    }

    return (
        <div className='add'>
            {/* Form to add new product */}
            <form className='flex-col' onSubmit={onSubmitHandler}>

                {/* Section to upload image */}
                <div className='add-img-upload flex-col'>
                    <p>Upload image</p>
                    {/* Hidden file input - triggers when label is clicked */}
                    <input onChange={(e) => { setImage(e.target.files[0]); e.target.value = '' }} type="file" accept="image/*" id="image" hidden />
                    <label htmlFor="image">
                        {/* Show default image or preview uploaded image */}
                        <img src={!image ? assets.upload_area : URL.createObjectURL(image)} alt="" />
                    </label>
                </div>

                {/* Product name input */}
                <div className='add-product-name flex-col'>
                    <p>Product name</p>
                    <input name='name' onChange={onChangeHandler} value={data.name} type="text" placeholder='Type here' required />
                </div>

                {/* Product description textarea */}
                <div className='add-product-description flex-col'>
                    <p>Product description</p>
                    <textarea name='description' onChange={onChangeHandler} value={data.description} type="text" rows={6} placeholder='Write content here' required />
                </div>

                {/* Category and price inputs in a row */}
                <div className='add-category-price'>

                    {/* Category dropdown */}
                    <div className='add-category flex-col'>
                        <p>Product category</p>
                        <select name='category' onChange={onChangeHandler} >
                            {/* List of predefined categories */}
                            <option value="Salad">Salad</option>
                            <option value="Rolls">Rolls</option>
                            <option value="Deserts">Deserts</option>
                            <option value="Sandwich">Sandwich</option>
                            <option value="Cake">Cake</option>
                            <option value="Pure Veg">Pure Veg</option>
                            <option value="Pasta">Pasta</option>
                            <option value="Noodles">Noodles</option>
                        </select>
                    </div>

                    {/* Product price input */}
                    <div className='add-price flex-col'>
                        <p>Product Price</p>
                        <input type="Number" name='price' onChange={onChangeHandler} value={data.price} placeholder='25' />
                    </div>
                </div>

                {/* Submit button */}
                <button type='submit' className='add-btn'>ADD</button>
            </form>
        </div>
    )
}

export default Add

// ✅ Summary of Add.jsx:
// Feature	Description
// 🖼️ Image Upload	Allows uploading an image file for the product.
// 📝 Input Fields	Product Name, Description, Price, Category.
// 📦 FormData	Used to send text + file data together to backend.
// 📤 Submit	On form submit, sends POST request to /api/food/add.
// ⚠️ Validation	Image is required; shows toast message if not selected.
// 🔔 Feedback	Uses react-toastify to show success or error messages.
// 📚 Libraries Used	axios for API call, toast for notifications.