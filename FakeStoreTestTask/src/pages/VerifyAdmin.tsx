import { useState } from "react";
import axios, { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";

const VerifyAdmin = () => {
  const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const firstUserData = JSON.parse(
      localStorage.getItem("firstUserData") || "{}"
    );

    try {
      const response = await axios.post(
        "http://localhost:5000/api/reg/verify-admin",
        {
          username, // логін адміна для верифікації
          password, // пароль адміна
          newUser: firstUserData, // дані першого юзера з localStorage
        }
      );

      if (response.status === 200) {
        console.log("Admin verified, user created");
        localStorage.removeItem("firstUserData");
        navigate("/login");
      }
    } catch (err) {
      const error = err as AxiosError<{ message?: string }>;

      if (error.response?.status === 401) {
        console.log("Invalid admin credentials");
      } else {
        console.log(error.response?.data?.message || "Server error");
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-6 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-center">
          Admin Verification
        </h2>

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

          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700"
          >
            Verify Admin
          </button>
        </form>
      </div>
    </div>
  );
};

export default VerifyAdmin;
