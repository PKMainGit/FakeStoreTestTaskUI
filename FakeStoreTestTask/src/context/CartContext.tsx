// src/context/CartContext.tsx
import { createContext, useState } from "react";
import type { ReactNode } from "react";
import type { Product, CartProduct } from "../types/types";

// Структура контексту
interface CartContextType {
  cartItems: CartProduct[];
  addItem: (product: Product) => void;
  removeItem: (productId: number) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
}

// Ініціалізація контексту з порожнім значенням
const CartContext = createContext<CartContextType | undefined>(undefined);

// Провайдер
export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartProduct[]>([]);

  const addItem = (product: Product) => {
    setCartItems((prevItems) => {
      const existing = prevItems.find((item) => item.id === product.id);
      if (existing) {
        // Якщо товар вже є в корзині, збільшуємо кількість
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      // Інакше додаємо новий товар з quantity = 1
      return [...prevItems, { ...product, quantity: 1 }];
    });
  };

  const removeItem = (productId: number) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.id !== productId)
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getTotalPrice = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  return (
    <CartContext.Provider
      value={{ cartItems, addItem, removeItem, clearCart, getTotalPrice }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
