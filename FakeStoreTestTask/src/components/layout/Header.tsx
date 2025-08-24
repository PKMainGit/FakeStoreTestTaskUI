import { useState } from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { Cart } from "../../features/cart/components/Cart";
import { useOrders } from "../../features/orders/context/useOrders";

const Header = () => {
  const navigate = useNavigate();
  const [showCart, setShowCart] = useState(false);
	const { orderCount } = useOrders();

  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:5000/api/auth/logout",
        {},
        { withCredentials: true }
      );
    } catch (err) {
      console.error(err);
    }
    navigate("/login");
  };

  return (
    <AppBar position="static" className="bg-blue-600">
      <Toolbar className="flex justify-between">
        <Typography variant="h6">My Dashboard</Typography>

        <div className="flex items-center gap-4">
          <nav className="flex gap-4">
            <Link to="/dashboard/admin" className="hover:underline">
              Dashboard
            </Link>
            <Link to="/dashboard/products" className="hover:underline">
              Products
            </Link>
            <Link to="/dashboard/orders" className="hover:underline">
              Orders {orderCount > 0 && `(${orderCount})`}
            </Link>
            <Button
              color="inherit"
              onClick={handleLogout}
              className="hover:bg-blue-700"
            >
              Logout
            </Button>
            <Button
              color="inherit"
              onClick={() => setShowCart(!showCart)}
              className="hover:bg-blue-700"
            >
              Cart
            </Button>
          </nav>
        </div>
      </Toolbar>

      {showCart && (
        <div className="fixed top-20 right-4 w-80 z-50 bg-white shadow-lg p-4 rounded">
          <Cart />
        </div>
      )}
    </AppBar>
  );
};

export default Header;
