// src/components/DashboardOutlet.tsx
import { Outlet } from "react-router-dom";
import Header from "../../../components/layout/Header";
import Footer from "../../../components/layout/Footer";

const Dashboard = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 p-6 bg-gray-100">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
