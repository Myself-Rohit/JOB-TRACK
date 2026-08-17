import User from "../models/user.models.js";

export const getProfileInfo = async (req, res) => {
  try {
    const userId = req.user._id;
    if (!userId) throw new Error("User Unauthorized!");

    const profile = await User.findById(userId);
    if (!profile) throw new Error("User profile not found!");
    res.status(200).json({ message: "", data: profile });
  } catch (error) {
    res.status(400).json({ error: error.message || "Something went wrong" });
  }
};

export const updateProfileInfo = async (req, res) => {
  try {
    const userId = req.user._id;
    if (!userId) throw new Error("User Unauthorized!");
    const {
      profileName,
      profileEmail,
      location,
      bio,
      role,
      phone,
      website,
      github,
      linkedin,
    } = req.body;

    const userProfile = await User.findById(userId);
    if (!userProfile) throw new Error("User profile not found!");

    const { userName, email, password } = userProfile._doc;

    const updatedProfile = await User.findByIdAndUpdate(userId, {
      userName,
      email,
      password,
      profileName,
      profileEmail,
      location,
      bio,
      role,
      phone,
      website,
      github,
      linkedin,
    });

    res
      .status(200)
      .json({ message: "Profile Updated Successfully!", data: updateProfile });
  } catch (error) {
    res.status(400).json({ error: error.message || "Something went wrong" });
  }
};
