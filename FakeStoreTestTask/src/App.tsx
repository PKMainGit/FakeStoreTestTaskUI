import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import VerifyAdmin from "./pages/VerifyAdmin";
import DashboardLayout from "./components/DashboardLayout";
import HomeRedirect from "./components/BaseLink";
import AdminDashboard from "./pages/AdminDashboard";
import CashierDashboard from "./pages/CashierDashboard";

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
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
