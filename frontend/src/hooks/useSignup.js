import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import axios from "axios";
import { useAuthContext } from "../context/AuthContext.jsx";
const useSignup = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();
  const navigate = useNavigate();

  const signup = async (formData) => {
    try {
      setLoading(true);
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/signup`,
        formData,
        {
          withCredentials: true,
        },
      );
      if (res.data) {
        localStorage.setItem("currentUser", JSON.stringify(res.data));
        toast.success("Signin successful!");
        navigate("/");
        setAuthUser(res.data);
      }
    } catch (err) {
      toast.error(err?.response?.data || "Signup failed! Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return { loading, signup };
};
export default useSignup;
