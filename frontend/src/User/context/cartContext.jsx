import React, { createContext, useContext, useReducer, useEffect } from "react";

const CartContext = createContext();
const LOCAL_KEY = "cart_v1";

// helper: convert "$12.99" -> 12.99 (also accepts numeric)
function parsePrice(price) {
  if (typeof price === "number") return price;
  if (!price) return 0;
  return Number(String(price).replace(/[^0-9.-]+/g, "")) || 0;
}

function formatCurrency(n) {
  return n.toLocaleString(undefined, { style: "currency", currency: "USD" });
}

const initialState = { items: [] };

function cartReducer(state, action) {
  switch (action.type) {
    case "INIT":
      return action.payload ?? initialState;
    case "ADD_ITEM": {
      const { item, qty } = action.payload;
      const idx = state.items.findIndex((i) => i.id === item.id);
      if (idx > -1) {
        const items = state.items.slice();
        items[idx] = { ...items[idx], quantity: items[idx].quantity + qty };
        return { ...state, items };
      }
      return { ...state, items: [...state.items, { ...item, quantity: qty }] };
    }
    case "REMOVE_ITEM":
      return { ...state, items: state.items.filter((i) => i.id !== action.payload.id) };
    case "UPDATE_QTY": {
      const { id, quantity } = action.payload;
      return {
        ...state,
        items: state.items.map((i) => (i.id === id ? { ...i, quantity: Math.max(1, quantity) } : i)),
      };
    }
    case "CLEAR_CART":
      return initialState;
    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // init from localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem(LOCAL_KEY);
      if (raw) dispatch({ type: "INIT", payload: JSON.parse(raw) });
    } catch (e) {
      console.warn("Failed to load cart from localStorage", e);
    }
  }, []);

  // persist on change
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_KEY, JSON.stringify(state));
    } catch (e) {
      console.warn("Failed to save cart to localStorage", e);
    }
  }, [state]);

  // helpers exposed to components
  function addItem(item, qty = 1) {
    // ensure item has id and a numeric price field for calculations
    const priceNum = parsePrice(item.price);
    const normalized = { ...item, priceNum };
    dispatch({ type: "ADD_ITEM", payload: { item: normalized, qty } });
  }

  function removeItem(id) {
    dispatch({ type: "REMOVE_ITEM", payload: { id } });
  }

  function updateQty(id, quantity) {
    dispatch({ type: "UPDATE_QTY", payload: { id, quantity } });
  }

  function clearCart() {
    dispatch({ type: "CLEAR_CART" });
  }

  const totalItems = state.items.reduce((s, it) => s + it.quantity, 0);
  const totalPrice = state.items.reduce((s, it) => s + (it.priceNum ?? parsePrice(it.price)) * it.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items: state.items,
        addItem,
        removeItem,
        updateQty,
        clearCart,
        totalItems,
        totalPrice,
        formatCurrency,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
