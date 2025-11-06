
import React, { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState([]);

  // Add item to cart
  const addItem = ({ dishId, kitchenId, name, price, quantity = 1 }) => {
    setItems((prev) => {
      // Check if item already exists for the same dish & kitchen
      const existing = prev.find(
        (item) => item.dishId === dishId && item.kitchenId === kitchenId
      );

      if (existing) {
        // Increment quantity
        return prev.map((item) =>
          item.dishId === dishId && item.kitchenId === kitchenId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }

      // Add new item
      return [...prev, { dishId, kitchenId, name, price, quantity }];
    });
  };

  // Remove item
  const removeItem = (dishId, kitchenId) => {
    setItems((prev) =>
      prev.filter(
        (item) => !(item.dishId === dishId && item.kitchenId === kitchenId)
      )
    );
  };

  // Clear cart
  const clearCart = () => setItems([]);

  // Total price
  const totalPrice = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  // Optional: format currency
  const formatCurrency = (amount) =>
    `$${amount.toFixed(2)}`;

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        clearCart,
        totalPrice,
        formatCurrency,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Hook to use cart
export const useCart = () => useContext(CartContext);
