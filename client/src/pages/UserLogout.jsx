import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const UserLogout = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    const logout = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/users/logout`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 200) {
          localStorage.removeItem("token");
          navigate("/login");
        }
      } catch (error) {
        console.error("Logout failed:", error.response?.data || error.message);
      }
    };

    logout();
  }, [navigate, token]);

  return <div>UserLogout</div>;
};

export default UserLogout;
