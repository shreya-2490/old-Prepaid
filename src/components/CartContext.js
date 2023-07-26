import React, { createContext, useState } from "react";

// Create the CartContext
export const CartContext = createContext();

// Create the CartProvider component
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [bulkCartItems, setBulkCartItems] = useState([]);

  const cartCount = cartItems?.reduce((accumulator, object) => {
    return accumulator + object?.quantity || 1;
  }, 0);

  // Add item to the cart
  const addToCart = (item) => {
    const existingCartItemIndex = cartItems.findIndex(
      (cartItem) =>
        cartItem.usdValue === item.usdValue && cartItem.card === item.card
    );
    if (existingCartItemIndex !== -1) {
      const updatedItems = [...cartItems];
      if (updatedItems[existingCartItemIndex].quantity < 4) {
        updatedItems[existingCartItemIndex].quantity += 1;
        setCartItems(updatedItems);
      }
    } else {
      setCartItems((prevItems) => [...prevItems, { ...item, quantity: 1 }]);
    }
  };
  const addToBulkCart = (item) => {
    setBulkCartItems([...bulkCartItems, { ...item }]);
  };

  // Remove item from the cart
  const removeFromCart = (itemId) => {
    const updatedCartItems = cartItems?.filter(
      (cartItem) => cartItem?.id !== itemId
    );
    setCartItems(updatedCartItems);
  };
  const removeBulkFromCart = (itemId) => {
    const updatedCartItems = bulkCartItems?.filter(
      (bulkCartItem) => bulkCartItem?.id !== itemId
    );
    setBulkCartItems(updatedCartItems);
  };

  const updateQuantity = (itemId, quantity) => {
    const cartItemIndex = cartItems.findIndex(
      (cartItem) => cartItem.id === itemId
    );

    if (cartItemIndex !== -1) {
      const updatedItems = [...cartItems];
      updatedItems[cartItemIndex].quantity = quantity;
      setCartItems(updatedItems);
    }
  };

  // Clear the cart
  const clearCart = () => {
    setCartItems([]);
  };

  // Provide the cart state and actions to the children components
  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        addToBulkCart,
        removeBulkFromCart,
        bulkCartItems,
        removeFromCart,
        clearCart,
        cartCount,
        updateQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
