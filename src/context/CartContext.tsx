"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface CartItem {
  product_id: string;
  medicine_id: string;
  name_bn: string;
  name_en: string;
  unit_price: number;
  pack_unit: string;
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  items: CartItem[];
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  addToCart: (item: CartItem) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getSubtotal: () => number;
  subtotal: number;
  totalPrice: number;
  totalItems: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);
const STORAGE_KEY = "jibonjotno_cart_v2";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) setCart(parsed);
      }
    } catch (e) {
      console.warn("Cart load error:", e);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
    } catch (e) {
      console.warn("Cart save error:", e);
    }
  }, [cart]);

  const addToCart = (newItem: CartItem) => {
    if (!newItem || !newItem.product_id) return;
    setCart((prev) => {
      const idx = prev.findIndex((i) => i.product_id === newItem.product_id);
      if (idx > -1) {
        const updated = [...prev];
        updated[idx] = {
          ...updated[idx],
          quantity: updated[idx].quantity + (newItem.quantity || 1),
        };
        return updated;
      }
      return [...prev, { ...newItem, quantity: newItem.quantity || 1 }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product_id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.product_id === productId ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => setCart([]);

  const getSubtotal = () =>
    cart.reduce((sum, item) => sum + Number(item.unit_price || 0) * Number(item.quantity || 1), 0);

  const subtotal = getSubtotal();
  const totalPrice = subtotal;
  const totalItems = cart.reduce((sum, item) => sum + Number(item.quantity || 0), 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        items: cart,
        isCartOpen,
        setIsCartOpen,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getSubtotal,
        subtotal,
        totalPrice,
        totalItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    return {
      cart: [],
      items: [],
      isCartOpen: false,
      setIsCartOpen: () => {},
      addToCart: () => {},
      removeFromCart: () => {},
      updateQuantity: () => {},
      clearCart: () => {},
      getSubtotal: () => 0,
      subtotal: 0,
      totalPrice: 0,
      totalItems: 0,
    };
  }
  return context;
}