import { createContext } from "react";

export interface OrdersContextType {
  orderCount: number;
  refreshOrders: () => void;
}

// тільки контекст і провайдер тут
export const OrdersContext = createContext<OrdersContextType | undefined>(
  undefined
);
