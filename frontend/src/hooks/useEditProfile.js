import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";

const useEditProfile = () => {
  const [profileInfo, setProfileInfo] = useState(null);
  const editProfile = async (formData) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/profile/info/update`,
        { ...formData },
        { withCredentials: true },
      );
      if (res.data) {
        setProfileInfo(res.data?.data);
      }
      toast.success(res.message || "profile updated!");
    } catch (error) {
      toast.error(error.message || "Profile not updated!");
    }
  };
  return { editProfile, profileInfo, setProfileInfo };
};

export default useEditProfile;
