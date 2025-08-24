import { OrdersContext } from "./OrderContext";
import { useState, useEffect } from "react";
import type { ReactNode } from "react";
import axios from "axios";

export const OrdersProvider = ({ children }: { children: ReactNode }) => {
  const [orderCount, setOrderCount] = useState(0);

  const fetchOrderCount = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/order", {
        withCredentials: true,
      });
      setOrderCount(res.data.length);
    } catch (err) {
      console.error("Error fetching orders count", err);
    }
  };

  useEffect(() => {
    fetchOrderCount();
  }, []);

  return (
    <OrdersContext.Provider
      value={{ orderCount, refreshOrders: fetchOrderCount }}
    >
      {children}
    </OrdersContext.Provider>
  );
};
