import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const useGetProfile = () => {
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState(null);
  const getProfileInfo = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/profile/info`,
        { withCredentials: true },
      );
      if (res.data) {
        console.log("Profile:", res.data);
        setProfile(res.data?.data);
      }
    } catch (error) {
      toast.error(error.message || "");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getProfileInfo();
  }, []);
  return { loading, profile, getProfileInfo };
};
export default useGetProfile;
