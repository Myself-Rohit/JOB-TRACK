import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";

const useRemoveApplication = () => {
  const [loading, setLoading] = useState(false);
  const removeApplication = async (id) => {
    try {
      setLoading(true);
      const res = await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/application/remove/${id}`,
        { withCredentials: true },
      );
      if (res.data) {
        toast.success("Auction item deleted");
      }
      return true;
    } catch (err) {
      toast.error(err.message || "Something went wrong");
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { loading, removeApplication };
};
export default useRemoveApplication;
