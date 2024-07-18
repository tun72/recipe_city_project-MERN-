import axios from "axios";
import { URL } from "../../utils/constant";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
function Logout() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { dispatch } = useAuthContext();
  async function logout() {
    try {
      setIsLoading(true);
      const response = await axios.post(
        `${URL}/api/auth/logout`,
        {},
        { withCredentials: true }
      );
      if (!response.status === 200) {
        throw new Error("Logout Error");
      }

      navigate("/login");
      dispatch({ type: "logout" });
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <button onClick={logout} disabled={isLoading}>
      Logout
    </button>
  );
}

export default Logout;
