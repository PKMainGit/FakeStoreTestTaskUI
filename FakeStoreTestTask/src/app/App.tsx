import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "../features/auth/pages/Register";
import Login from "../features/auth/pages/Login";
import VerifyAdmin from "../features/auth/pages/VerifyAdmin";
import HomeRedirect from "../features/auth/redirect/BaseLink";
import Dashboard from "../features/dashboard/pages/DashboardPage";
import AdminDashboard from "../features/dashboard/components/AdminDashboard";
import CashierDashboard from "../features/dashboard/components/CashierDashboard";
import ProductsPage from "../features/products/pages/ProductsPage";
import OrdersPage from "../features/orders/pages/Orders";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeRedirect />} />
        <Route path="/reg" element={<Register />} />
        <Route path="/verify-admin" element={<VerifyAdmin />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />}>
          {/* дочірні */}
          <Route path="admin" element={<AdminDashboard />} />
          <Route path="cashier" element={<CashierDashboard />} />
          <Route path="products" element={<ProductsPage />} />
          <Route path="orders" element={<OrdersPage />} />;
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
