"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface CartItem {
  id?: string;
  product_id: string;
  medicine_id?: string;
  name?: string;
  name_bn?: string;
  name_en?: string;
  price?: number;
  unit_price: number;
  strip_price?: number;
  pack_unit?: string;
  quantity: number;
  [key: string]: any;
}

export interface CartContextType {
  cart: CartItem[];
  items: CartItem[];
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  addToCart: (item: any) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getSubtotal: () => number;
  subtotal: number;
  totalPrice: number;
  totalItems: number;
  [key: string]: any;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("jibonjotno_cart_v2");
      if (saved) setCart(JSON.parse(saved));
    } catch (e) {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("jibonjotno_cart_v2", JSON.stringify(cart));
    } catch (e) {}
  }, [cart]);

  const addToCart = (newItem: any) => {
    if (!newItem) return;
    const pId = newItem.product_id || newItem.id || "item_" + Date.now();
    setCart((prev) => {
      const idx = prev.findIndex((i) => (i.product_id || i.id) === pId);
      if (idx > -1) {
        const updated = [...prev];
        updated[idx] = {
          ...updated[idx],
          quantity: updated[idx].quantity + (newItem.quantity || 1),
        };
        return updated;
      }
      return [
        ...prev,
        {
          ...newItem,
          product_id: pId,
          id: pId,
          unit_price: Number(newItem.unit_price || newItem.price || 0),
          quantity: newItem.quantity || 1,
        },
      ];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => (item.product_id || item.id) !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        (item.product_id || item.id) === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => setCart([]);

  const getSubtotal = () =>
    cart.reduce(
      (sum, item) =>
        sum + Number(item.unit_price || item.price || 0) * Number(item.quantity || 1),
      0
    );

  const subtotal = getSubtotal();

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
        totalPrice: subtotal,
        totalItems: cart.reduce((sum, item) => sum + Number(item.quantity || 0), 0),
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