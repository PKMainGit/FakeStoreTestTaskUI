import { useCart } from "../context/useCart";

export const Cart = () => {
  const { cartItems, removeItem, clearCart, getTotalPrice } = useCart();

  if (cartItems.length === 0) return <p className="text-black">Корзина порожня</p>;

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
        onClick={clearCart}
      >
        Очистити корзину
      </button>
    </div>
  );
};
