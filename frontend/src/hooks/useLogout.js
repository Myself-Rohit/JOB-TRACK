import { toast } from "react-toastify";
import { useAuthContext } from "../context/AuthContext";
import axios from "axios";

const useLogut = () => {
  const { setAuthUser } = useAuthContext();
  const logout = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/auth/signout`,
      );
      if (res.data) {
        localStorage.removeItem("currentUser");
        setAuthUser(null);
        toast.success("Logged out successfully");
      }
    } catch (error) {
      toast.error(
        error?.response?.data || "failed to Logout! Please try again.",
      );
    }
  };
  return { logout };
};

export default useLogut;
