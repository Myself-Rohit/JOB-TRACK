import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const useCreateApplication = () => {
  const [loading, setLoading] = useState(false);

  const createApplication = async (formData) => {
    try {
      setLoading(true);
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/application/create`,
        { ...formData },
        { withCredentials: true },
      );

      if (res.data) {
        toast.success("New Application added successfully!");
      }
    } catch (err) {
      toast.error(err?.response?.data || "Appication not created, Try again!");
    } finally {
      setLoading(false);
    }
  };

  return { loading, createApplication };
};

export default useCreateApplication;
