import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import VerifyAdmin from "./pages/VerifyAdmin";
import Dashboard from "./pages/Dashboard";
import HomeRedirect from "./pages/BaseLink";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeRedirect />} />
        <Route path="/reg" element={<Register />} />
        <Route path="/verify-admin" element={<VerifyAdmin />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
