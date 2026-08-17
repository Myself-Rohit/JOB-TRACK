import axios from "axios";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

const useDeleteProfile = () => {
  const navigate = useNavigate();
  const deleteProfile = async () => {
    try {
      const res = await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/profile/delete`,
        { withCredentials: true },
      );
      if (res?.data) {
        toast.success(res.data?.message || "Account deleted.");
        navigate("/signin");
      }
    } catch (error) {
      toast.error(error.message || "Account is not deleted!");
    }
  };
  return { deleteProfile };
};
export default useDeleteProfile;
