import React, { useContext, useState } from 'react' // React core + hooks
import './FoodItem.css' // Component-specific styles
import { assets } from '../../assets/assets' // Icons/images (add, remove, rating, etc.)
import { StoreContext } from '../../Context/StoreContext' // Global state (cart, url, currency, etc.)

const FoodItem = ({ image, name, price, desc , id }) => {

    // Local state (optional, unused for now)
    const [itemCount, setItemCount] = useState(0)

    // Access shared global state and functions from StoreContext
    const { cartItems, addToCart, removeFromCart, url, currency } = useContext(StoreContext)

    return (
        <div className='food-item'>
            <div className='food-item-img-container'>
                {/* Load food image using base URL */}
                <img className='food-item-image' src={url + "/images/" + image} alt="" />

                {/* If item not in cart, show "add" icon, else show quantity counter */}
                {!cartItems[id]
                    ? <img 
                        className='add' 
                        onClick={() => addToCart(id)} 
                        src={assets.add_icon_white} 
                        alt="" 
                      />
                    : <div className="food-item-counter">
                        <img 
                            src={assets.remove_icon_red} 
                            onClick={() => removeFromCart(id)} 
                            alt="" 
                        />
                        <p>{cartItems[id]}</p>
                        <img 
                            src={assets.add_icon_green} 
                            onClick={() => addToCart(id)} 
                            alt="" 
                        />
                    </div>
                }
            </div>

            <div className="food-item-info">
                <div className="food-item-name-rating">
                    {/* Food name and a static star rating image */}
                    <p>{name}</p> 
                    <img src={assets.rating_starts} alt="" />
                </div>

                {/* Food description */}
                <p className="food-item-desc">{desc}</p>

                {/* Food price with currency */}
                <p className="food-item-price">{currency}{price}</p>
            </div>
        </div>
    )
}

export default FoodItem


// -------------------------
// 📄 Summary:
// -------------------------
// 🔸 FoodItem is a reusable component that shows a single food card.
// 🔸 Displays:
//    - Image
//    - Name
//    - Rating (static image)
//    - Description
//    - Price (with currency symbol)
// 🔸 Also includes:
//    - "Add to Cart" button if item not in cart
//    - "+" and "–" controls if item is already in cart
// 🔸 Uses StoreContext to:
//    - Track cart items (cartItems)
//    - Handle add/remove logic (addToCart, removeFromCart)
//    - Get image base URL and currency symbol
//
// ✅ Props:
// - id: Unique item ID
// - image, name, desc, price: Food details
//
// ✅ Context:
// - cartItems: { id: quantity }
// - url: Base URL for images
// - currency: Global currency symbol
// -------------------------
