import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { toast } from "react-toastify";

const useGetApplication = (id) => {
  const [loading, setLoading] = useState(false);
  const [application, setApplication] = useState(null);
  const getApplication = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/application/details/${id}`,
        { withCredentials: true },
      );
      if (res.data) {
        setApplication(res.data?.data);
      }
    } catch (error) {
      toast.error(error?.message || "");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getApplication();
  }, []);

  return { loading, application, setApplication };
};
export default useGetApplication;
