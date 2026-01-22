import React, { useContext } from 'react' // Importing React and useContext hook
import './Cart.css' // Importing CSS for cart styling
import { StoreContext } from '../../Context/StoreContext' // Importing shared state/context
import { useNavigate } from 'react-router-dom'; // Hook to navigate programmatically

const Cart = () => {

  // Destructuring necessary data and functions from context
  const {
    cartItems,        // Object with itemId as key and quantity as value
    food_list,        // List of all available food items
    removeFromCart,   // Function to remove item from cart
    getTotalCartAmount, // Function to calculate cart subtotal
    url,              // Base URL for images
    currency,         // Currency symbol
    deliveryCharge    // Flat delivery fee
  } = useContext(StoreContext);

  const navigate = useNavigate(); // To redirect user on button click

  return (
    <div className='cart'> {/* Wrapper for entire cart page */}
      
      {/* ------------------ Cart Item List ------------------ */}
      <div className="cart-items">
        <div className="cart-items-title"> {/* Header Row */}
          <p>Items</p> <p>Title</p> <p>Price</p> <p>Quantity</p> <p>Total</p> <p>Remove</p>
        </div>
        <br />
        <hr />

        {/* Loop through food items and show only if present in cart */}
        {food_list.map((item, index) => {
          if (cartItems[item._id] > 0) {
            return (
              <div key={index}>
                <div className="cart-items-title cart-items-item"> {/* Cart row */}
                  <img src={url + "/images/" + item.image} alt="" /> {/* Item image */}
                  <p>{item.name}</p> {/* Item name */}
                  <p>{currency}{item.price}</p> {/* Price per unit */}
                  <div>{cartItems[item._id]}</div> {/* Quantity selected */}
                  <p>{currency}{item.price * cartItems[item._id]}</p> {/* Total price for this item */}
                  <p
                    className='cart-items-remove-icon'
                    onClick={() => removeFromCart(item._id)} // Remove item on click
                  >x</p>
                </div>
                <hr />
              </div>
            )
          }
        })}
      </div>

      {/* ------------------ Cart Bottom Summary & Promo ------------------ */}
      <div className="cart-bottom">

        {/* ----- Cart Totals ----- */}
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>{currency}{getTotalCartAmount()}</p> {/* Total of all items */}
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>{currency}{getTotalCartAmount() === 0 ? 0 : deliveryCharge}</p> {/* Conditional delivery charge */}
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>{currency}{getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + deliveryCharge}</b> {/* Final amount */}
            </div>
          </div>
          <button onClick={() => navigate('/order')}>PROCEED TO CHECKOUT</button> {/* Redirect to order page */}
        </div>

        {/* ----- Promo Code Section (UI only) ----- */}
        <div className="cart-promocode">
          <div>
            <p>If you have a promo code, Enter it here</p>
            <div className='cart-promocode-input'>
              <input type="text" placeholder='promo code' /> {/* Promo code input field */}
              <button>Submit</button> {/* Submit button (not functional yet) */}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
