import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { toast } from "react-toastify";

const useGetAllApplications = () => {
  const [loading, setLoading] = useState(false);
  const [applications, setApplications] = useState(null);
  const getAllApplications = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/application/all`,
        { withCredentials: true },
      );
      if (res.data) {
        setApplications(res.data?.data);
      }
    } catch (error) {
      toast.error(error.message || "");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getAllApplications();
  }, []);

  return { loading, applications, setApplications };
};
export default useGetAllApplications;
