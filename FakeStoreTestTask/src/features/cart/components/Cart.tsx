import { useCart } from "../../cart/hooks/useCart";
import { useState } from "react";
import type { Product } from "../../../types/index";
import axios from "axios";
import { useOrders } from "../../orders/context/useOrders";

export const Cart = ({
  onPayment,
}: {
  onPayment?: (soldItems: Product[]) => void;
}) => {
  const { cartItems, removeItem, clearCart, getTotalPrice, updateQuantity } =
    useCart();
	const [loading, setLoading] = useState(false);
	const { refreshOrders } = useOrders();

  if (cartItems.length === 0)
    return <p className="text-black">Корзина порожня</p>;

  const handlePayment = async () => {
    setLoading(true);

    try {
      const response = await axios.post("http://localhost:5000/api/order", {
        items: cartItems,
        total: getTotalPrice(),
      });

			console.log("Order created:", response.data);
			
			refreshOrders();

      if (onPayment) onPayment(cartItems);

      clearCart();
      alert("Оплачено!");
    } catch (err) {
      console.error("Помилка при оплаті:", err);
      alert("Помилка при оплаті");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-2">Корзина</h2>
      <ul>
        {cartItems.map((item) => (
          <li
            key={item.id}
            className="flex items-center justify-between text-black mb-2"
          >
            <span className="flex-1">
              {item.name} x {item.quantity}
            </span>

            {/* 🔹 Кнопки кількості */}
            <div className="flex items-center gap-2">
              <button
                className="px-2 py-1 bg-gray-300 rounded"
                onClick={() =>
                  updateQuantity(item.id, Math.max((item.quantity ?? 1) - 1, 1))
                }
                disabled={loading}
              >
                ➖
              </button>
              <span>{item.quantity}</span>
              <button
                className="px-2 py-1 bg-gray-300 rounded"
                onClick={() =>
                  updateQuantity(item.id, (item.quantity ?? 1) + 1)
                }
                disabled={loading}
              >
                ➕
              </button>
            </div>

            <span className="w-24 text-right">
              {item.price * (item.quantity ?? 1)} PLN
            </span>

            <button
              className="text-red-500 ml-2"
              onClick={() => removeItem(item.id)}
              disabled={loading}
            >
              ❌
            </button>
          </li>
        ))}
      </ul>

      <p className="font-bold text-black mt-2">Сума: {getTotalPrice()} PLN</p>

      <button
        className="bg-green-600 text-white px-4 py-2 rounded mt-2"
        onClick={handlePayment}
        disabled={loading}
      >
        {loading ? "Оплата..." : "Оплатити"}
      </button>

      <button
        className="bg-gray-400 text-white px-4 py-2 rounded mt-2 ml-2"
        onClick={clearCart}
        disabled={loading}
      >
        Очистити корзину
      </button>
    </div>
  );
};

