//src/components/Header.tsx
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:5000/api/auth/logout",
        {},
        { withCredentials: true }
      );
    } catch (err) {
      console.error(err);
    }
    navigate("/login");
  };

  return (
    <AppBar position="static" className="bg-blue-600">
      <Toolbar className="flex justify-between">
        <Typography variant="h6">My Dashboard</Typography>
        <div>
          <Button
            color="inherit"
            onClick={handleLogout}
            className="hover:bg-blue-700"
          >
            Logout
          </Button>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
