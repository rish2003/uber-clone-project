/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */

import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const UserProtectWrapper = ({ children }) => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token]);

  return <>{children}</>;
};

export default UserProtectWrapper;
