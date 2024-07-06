import React, { useEffect, useRef, useState } from "react";
import "./Card.css"; // Import your CSS file for card styling
import { useDispatchCart, useCart } from './ContextReducer';

const Card = (props) => {
  const dispatch = useDispatchCart();
  const data = useCart();
  const priceRef = useRef();

  // Extract price options from props.options Map
  const priceOptions = Array.from(props.options.keys());

  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState(priceOptions[0]);

  let finalPrice = quantity * parseInt(props.options.get(size).price);

  useEffect(() => {
    setSize(priceRef.current.value);
  }, []);

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    setQuantity(value > 0 ? value : 1);
  };

  const handleSizeChange = (e) => {
    setSize(e.target.value);
  };

  const handleAddToCart = async () => {
    try {
      const existingCartItem = data.find(item => item.id === props.foodItems._id && item.size === size);

      let newPrice = finalPrice; // Calculate new price based on quantity
      if (existingCartItem) {
        newPrice += existingCartItem.price; // Add existing price
      }

      if (existingCartItem) {
        // If item already exists in cart, update its quantity
        await dispatch({
          type: "UPDATE_QUANTITY",
          id: props.foodItems._id,
          size: size,
          quantity: existingCartItem.quantity + quantity,
          price: newPrice
        });
      } else {
        // If item doesn't exist in cart, add it
        await dispatch({
          type: "ADD",
          id: props.foodItems._id,
          img: props.foodItems.img,
          name: props.foodItems.name,
          price: finalPrice,
          quantity: quantity,
          size: size
        });
      }

      // Save cart data to local storage
      localStorage.setItem("cart", JSON.stringify(data));
    } catch (error) {
      console.error("Error adding item to cart:", error.message);
    }
  };

  return (
    <div className="card h-100">
      <img src={props.foodItems.img} className="card-img-top" alt={props.cardtitle} style={{height:"300px",objectFit:"fill"}} />
      <div className="card-body">
        <h5 className="card-title">{props.foodItems.name}</h5>
        <div className="form-group">
          <label htmlFor="size">Select Size:</label>
          <select
            id="size"
            className="form-control"
            value={size}
            ref={priceRef}
            onChange={handleSizeChange}
          >
            {priceOptions.map((data) => (
              <option key={data} value={data}>{data}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="quantity">Quantity:</label>
          <input
            type="number"
            id="quantity"
            className="form-control"
            value={quantity}
            onChange={handleQuantityChange}
            min={1}
          />
        </div>
        <p>Total Price: {finalPrice}</p>
        <button className="btn btn-primary" onClick={handleAddToCart}>Add to Cart</button>
      </div>
    </div>
  );
};

export default Card;















