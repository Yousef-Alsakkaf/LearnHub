import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function LogOut() {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem("accessToken");
    navigate("/");
  }, [])

  return <div>Logging out</div>;
}

export default LogOut;
