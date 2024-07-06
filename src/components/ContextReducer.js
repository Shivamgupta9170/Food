import React, { createContext, useContext, useReducer } from "react";

// Define cart state context
const CartStateContext = createContext();
// Define cart dispatch context
const CartDispatchContext = createContext();

// Reducer function to handle cart state changes
const reducer = (state, action) => {
  switch (action.type) {
    case "LOAD_CART":
      return action.cart;
    case "ADD":
      return [
        ...state,
        {
          id: action.id,
          img: action.img,
          name: action.name,
          price: action.price,
          quantity: action.quantity,
          size: action.size,
        },
      ];
    case "REMOVE":
      return state.filter(
        (item) => !(item.id === action.id && item.size === action.size)
      );
    case "UPDATE_QUANTITY":
      return state.map((item) =>
        item.id === action.id && item.size === action.size
          ? {
              ...item,
              quantity: action.quantity,
              price: action.price,
            }
          : item
      );
    case "DROP":
      return [];
    default:
      console.log("Error in reducer");
      return state;
  }
};

// CartProvider component to provide cart state and dispatch functions to child components
export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, []);

  return (
    <CartDispatchContext.Provider value={dispatch}>
      <CartStateContext.Provider value={state}>
        {children}
      </CartStateContext.Provider>
    </CartDispatchContext.Provider>
  );
};

// Custom hook to access cart state
export const useCart = () => useContext(CartStateContext);
// Custom hook to access cart dispatch function
export const useDispatchCart = () => useContext(CartDispatchContext);
