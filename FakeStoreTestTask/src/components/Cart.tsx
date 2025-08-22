import { useCart } from "../context/useCart";
import { useState } from "react";
import type { CartProduct } from "../types/types";


export const Cart = ({
  onPayment,
}: {
  onPayment?: (soldItems: CartProduct[]) => void;
}) => {
  const { cartItems, removeItem, clearCart, getTotalPrice } = useCart();
  const [loading, setLoading] = useState(false);

  if (cartItems.length === 0)
    return <p className="text-black">Корзина порожня</p>;

  const handlePayment = async () => {
    setLoading(true);

    try {
      // 1️⃣ Тут можна зробити запит на бекенд для оновлення stock
      // наприклад: await axios.post('/api/orders', { items: cartItems });

      // 2️⃣ Якщо оновлюємо локально:
      cartItems.forEach((item) => {
        console.log(`Product ${item.name} sold: ${item.quantity}`);
        // item.stock -= item.quantity; // якщо stock зберігається в state продуктів
      });

      // 3️⃣ Викликаємо callback (опціонально)
      if (onPayment) onPayment(cartItems);

      clearCart();
      alert("Оплачено!");
    } catch (err) {
      console.error(err);
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
          <li key={item.id} className="flex justify-between mb-1">
            <span>
              {item.name} x {item.quantity}
            </span>
            <span>{item.price * (item.quantity || 1)} PLN</span>
            <button
              className="text-red-500 ml-2"
              onClick={() => removeItem(item.id)}
            >
              ❌
            </button>
          </li>
        ))}
      </ul>
      <p className="font-bold mt-2">Сума: {getTotalPrice()} PLN</p>
      <button
        className="bg-green-600 text-white px-4 py-2 rounded mt-2"
        onClick={handlePayment}
        disabled={loading}
      >
        {loading ? "Оплата..." : "Оплачено"}
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
