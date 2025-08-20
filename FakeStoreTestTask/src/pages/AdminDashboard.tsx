import { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/dashboard",
          {
            withCredentials: true, // ключово для HTTP-only cookie
          }
        );
        setMessage(response.data.message);
      } catch (err) {
        const error = err as AxiosError<{ message?: string }>;
        console.log(error.response?.data?.message || "Access denied");
        navigate("/login"); // якщо токен невалідний, редірект на логін
      }
    };

    fetchDashboard();
  }, [navigate]);

  const handleCreateUser = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/users/check-admin-role",
        { withCredentials: true } // обов’язково для HTTP-only cookies
      );
      if (response.status === 200) {
        navigate("/reg", { state: { allowedRole: "admin" } });
      }
    } catch (err) {
      const error = err as AxiosError<{ message?: string }>;
      alert(
        error.response?.data?.message ||
          "You are not authorized to create users"
      );
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-6 rounded-2xl shadow-lg text-center">
        <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
        <p>{message}</p>
        <button
          onClick={handleCreateUser}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 mb-4"
        >
          Create User
        </button>
      </div>
    </div>
  );
};

export default AdminDashboard;
