import { useState } from "react";
import axios, { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
} from "@mui/material";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        { username, password },
        { withCredentials: true } // важливо для cookie
      );

      if (response.status === 200) {
        const userRole = response.data.role; // беремо роль із відповіді сервера

        if (userRole === "admin") {
          navigate("/dashboard/admin");
        } else if (userRole === "cashier") {
          navigate("/dashboard/cashier");
        } else {
          navigate("/login"); // на всякий випадок
        }
      }
    } catch (err) {
      const error = err as AxiosError<{ message?: string }>;
      setError(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md rounded-2xl shadow-lg">
        <CardContent>
          <Typography variant="h5" align="center" gutterBottom>
            Login
          </Typography>

          {error && (
            <Typography color="error" className="mb-3">
              {error}
            </Typography>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <TextField
              label="Username"
              variant="outlined"
              fullWidth
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />

            <TextField
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              className="rounded-lg"
            >
              Login
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
