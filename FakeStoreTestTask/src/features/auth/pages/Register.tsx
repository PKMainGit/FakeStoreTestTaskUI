import { useState } from "react";
import axios, { AxiosError } from "axios";
import { useNavigate, useLocation } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const location = useLocation();
	const allowedRole = location.state?.allowedRole;
  const [role, setRole] = useState(
    allowedRole === "admin" ? "cashier" : "admin"
  );
  const [error, setError] = useState("");
	const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
    setError("");

    try {
      const response = await axios.get(
        "http://localhost:5000/api/reg/check-admin",
        { withCredentials: true }
      );
			
      // === Адмін вже є в базі ===
      if (response.status === 200) {
        // Дозволено створювати нового юзера тільки якщо allowedRole === "admin"
        if (allowedRole === "admin") {
          const newUser = { username, password, role };
					
          // Перевіряємо, що роль новостворюваного користувача — не порушує allowedRole
          if (role !== "cashier") {
            setError("New user role must be 'cashier'");
            return;
          }

          const createResponse = await axios.post(
            "http://localhost:5000/api/reg/create-user",
            newUser,
            { withCredentials: true }
          );

          if (createResponse.status === 201) {
            console.log("User created successfully");
            navigate("/login");
          }
        } else {
          // Якщо allowedRole не admin — редірект на login
          navigate("/login");
        }
      }
    } catch (error) {
      const err = error as AxiosError<{ exists?: boolean; message?: string }>;

      // === Перший юзер ===
      if (err.response?.status === 404) {
        localStorage.setItem(
          "firstUserData",
          JSON.stringify({ username, password, role })
        );
        navigate("/verify-admin");
      } else {
        setError(err.response?.data?.message || "Server error");
      }
    }
  };


  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-6 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-center">Register User</h2>

        {error && <p className="text-red-500 mb-3">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full p-2 border rounded-lg"
            />
          </div>

          <div>
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-2 border rounded-lg"
            />
          </div>

          <div>
            <label className="block text-gray-700">Role</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full p-2 border rounded-lg"
            >
              {allowedRole === "admin" ? (
                // Якщо адмін, то можна створювати тільки касира
                <option value="cashier">Cashier</option>
              ) : (
                // Перший юзер або інші сценарії — всі ролі
                <>
                  <option value="user">User</option>
                  <option value="cashier">Cashier</option>
                  <option value="admin">Admin</option>
                </>
              )}
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
