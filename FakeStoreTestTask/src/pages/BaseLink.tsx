import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios, { AxiosError } from "axios";

const HomeRedirect = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkAdmin = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/reg/check-admin"
        );

        if (response.status === 200) {
          // Admin вже існує → редірект на логін
          navigate("/login");
        }
      } catch (error) {
        const err = error as AxiosError;
        if (err.response?.status === 404) {
          // Admin відсутній → редірект на сторінку реєстрації
          navigate("/reg");
        } else {
          console.error("Server error:", err.response?.data || err.message);
        }
      }
    };

    checkAdmin();
  }, [navigate]);

  return null; // нічого не рендеримо
};

export default HomeRedirect;
