import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./app/store";
import App from "./app/App";
import { CartProvider } from "./features/cart/context/CartContext";
import { OrdersProvider } from "./features/orders/context/OrderProvider";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <CartProvider>
        <OrdersProvider>
          <App />
        </OrdersProvider>
      </CartProvider>
    </Provider>
  </React.StrictMode>
);
