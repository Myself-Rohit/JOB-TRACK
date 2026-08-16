import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";

const useUpdateApplication = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const updateApplication = async (formData) => {
    try {
      setLoading(true);
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/application/update/${formData._id}`,
        { ...formData },
        { withCredentials: true },
      );
    } catch (err) {
      toast.error(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
    return data;
  };

  return { loading, updateApplication };
};
export default useUpdateApplication;
