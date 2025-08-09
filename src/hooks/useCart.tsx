import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import type { Product } from '@/lib/products';

export type CartItem = {
  id: string; // cart item id
  productId: string;
  name: string;
  price: number;
  image: string;
  size?: string;
  color?: string;
  quantity: number;
};

interface CartContextValue {
  items: CartItem[];
  addItem: (product: Product, opts?: { size?: string; color?: string; quantity?: number }) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clear: () => void;
  totalItems: number;
  subtotal: number;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);
const STORAGE_KEY = 'graphphile_cart_v1';

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch (e) {
      // ignore
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      // ignore
    }
  }, [items]);

  const addItem: CartContextValue['addItem'] = (product, opts) => {
    const size = opts?.size ?? product.sizes?.[0];
    const color = opts?.color ?? product.colors?.[0]?.name;
    const quantity = Math.max(1, opts?.quantity ?? 1);

    // Merge with existing if same product/size/color
    const matchIndex = items.findIndex(
      (i) => i.productId === product.id && i.size === size && i.color === color
    );
    if (matchIndex > -1) {
      const next = [...items];
      next[matchIndex] = { ...next[matchIndex], quantity: next[matchIndex].quantity + quantity };
      setItems(next);
      return;
    }

    const newItem: CartItem = {
      id: `${product.id}-${size ?? 'na'}-${color ?? 'na'}`,
      productId: product.id,
      name: product.name,
      price: product.price,
      image: product.images?.[0] ?? '',
      size,
      color,
      quantity,
    };
    setItems((prev) => [newItem, ...prev]);
  };

  const removeItem = (id: string) => setItems((prev) => prev.filter((i) => i.id !== id));
  const updateQuantity = (id: string, quantity: number) =>
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, quantity: Math.max(1, quantity) } : i)));
  const clear = () => setItems([]);

  const totalItems = useMemo(() => items.reduce((s, i) => s + i.quantity, 0), [items]);
  const subtotal = useMemo(() => items.reduce((s, i) => s + i.price * i.quantity, 0), [items]);

  const value: CartContextValue = { items, addItem, removeItem, updateQuantity, clear, totalItems, subtotal };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
