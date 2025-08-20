import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import VerifyAdmin from "./pages/VerifyAdmin";
import DashboardLayout from "./pages/DashboardLayout";
import HomeRedirect from "./components/BaseLink";
import AdminDashboard from "./components/AdminDashboard";
import CashierDashboard from "./components/CashierDashboard";
import ProductsPage from "./pages/ProductsPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeRedirect />} />
        <Route path="/reg" element={<Register />} />
        <Route path="/verify-admin" element={<VerifyAdmin />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<DashboardLayout />}>
          {/* дочірні */}
          <Route path="admin" element={<AdminDashboard />} />
          <Route path="cashier" element={<CashierDashboard />} />
          <Route path="products" element={<ProductsPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
