import { Camera, Mail, MapPin, Pencil, Save, User } from "lucide-react";
import { useEffect, useState } from "react";
import useGetProfile from "../hooks/useGetProfile";
import useEditProfile from "../hooks/useEditProfile";
import { useNavigate } from "react-router";

function Profile() {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const { profile, getProfileInfo, loading } = useGetProfile();
  const { editProfile, setProfileInfo } = useEditProfile();
  const [formData, setFormData] = useState({
    profileName: "",
    profileEmail: "",
    location: "",
    bio: "",
    role: "",
    phone: "",
    website: "",
    github: "",
    linkedin: "",
  });

  useEffect(() => {
    if (profile) {
      setFormData({
        profileName: profile.profileName || profile.userName || "",
        profileEmail: profile.profileEmail || profile.email || "",
        location: profile.location || "",
        bio: profile.bio || "",
        role: profile.role || "",
        phone: profile.phone || "",
        website: profile.website || "",
        github: profile.github || "",
        linkedin: profile.linkedin || "",
      });
    }
  }, [profile]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log("name:", name);
    console.log("value:", value);
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    editProfile(formData);
    setProfileInfo(formData);
    setIsEditing(!isEditing);
  };

  if (!profile) return null;

  return (
    <div className="min-h-screen bg-[#080b14] px-4 py-6 text-white sm:px-6 lg:px-10 grow">
      <div className="mx-auto max-w-5xl">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-white">
            Profile
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Manage your personal information and profile details.
          </p>
        </div>

        <div className="mt-8 overflow-hidden rounded-3xl border border-white/[0.07] bg-[#0b0f1a]">
          <section className="p-6 sm:p-8">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              {/* User */}
              <div className="flex items-center gap-5">
                {/* Avatar */}

                <div className="relative">
                  <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 text-xl font-bold text-white shadow-lg shadow-indigo-950/30">
                    {(formData?.profileName || profile?.userName)
                      .split(" ")
                      .map((word) => word[0])
                      .join("")
                      .slice(0, 2)
                      .toUpperCase()}
                  </div>
                </div>

                {/* Name */}

                <div>
                  <h2 className="text-xl font-semibold text-white">
                    {formData?.profileName || profile?.userName}
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    {formData?.role}
                  </p>

                  <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-slate-600">
                    <span className="flex items-center gap-1.5">
                      <Mail className="h-3.5 w-3.5" />
                      {formData?.profileEmail || profile.email}
                    </span>

                    {formData?.location && (
                      <span className="flex items-center gap-1.5">
                        <MapPin className="h-3.5 w-3.5" />
                        {formData?.location}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Edit Button */}

              <button
                type="button"
                onClick={() => setIsEditing(!isEditing)}
                className="flex w-fit items-center shrink-0 gap-2 rounded-xl border border-white/[0.08] bg-white/[0.02] px-4 py-2.5 text-sm font-medium text-slate-400 transition hover:bg-white/[0.05] hover:text-white"
              >
                {isEditing ? (
                  <div
                    onClick={() => handleSave()}
                    className="flex gap-1 items-center"
                  >
                    <Save className="h-4 w-4" />
                    Save changes
                  </div>
                ) : (
                  <>
                    <Pencil className="h-4 w-4" />
                    Edit profile
                  </>
                )}
              </button>
            </div>
          </section>

          {/* PERSONAL INFORMATION */}

          <section className="border-t border-white/[0.06] px-6 py-7 sm:px-8">
            <div>
              <h2 className="text-sm font-semibold text-slate-200">
                Personal information
              </h2>

              <p className="mt-1 text-xs text-slate-600">
                Your basic profile information.
              </p>
            </div>

            <div className="mt-6 grid gap-x-8 gap-y-6 sm:grid-cols-2 ">
              {/* Name */}

              <div>
                <label className="text-xs text-slate-500">Full name</label>

                {isEditing ? (
                  <input
                    type="text"
                    name="profileName"
                    value={formData?.profileName || profile?.userName}
                    onChange={handleChange}
                    className="mt-2 w-full border-b border-white/[0.08] bg-transparent py-2 text-sm text-slate-200 outline-none transition focus:border-indigo-500"
                  />
                ) : (
                  <p className="mt-2 ml-7 text-sm text-slate-300 text-left ">
                    {formData?.profileName || profile?.userName}
                  </p>
                )}
              </div>

              {/* Email */}

              <div>
                <label className="text-xs text-slate-500 ">Email</label>

                {isEditing ? (
                  <input
                    type="email"
                    name="profileEmail"
                    value={formData?.profileEmail || profile?.email}
                    onChange={handleChange}
                    className="mt-2 w-full border-b border-white/[0.08] bg-transparent py-2 text-sm text-slate-200 outline-none transition focus:border-indigo-500 "
                  />
                ) : (
                  <p className="mt-2 ml-7 text-sm text-slate-300 text-left ">
                    {formData?.profileEmail || formData?.email}
                  </p>
                )}
              </div>

              {/* Role */}

              <div>
                <label className="text-xs text-slate-500">Current role</label>

                {isEditing ? (
                  <input
                    type="text"
                    name="role"
                    value={formData?.role}
                    onChange={handleChange}
                    className="mt-2 w-full border-b border-white/[0.08] bg-transparent py-2 text-sm text-slate-200 outline-none transition focus:border-indigo-500"
                  />
                ) : (
                  <p className="mt-2 ml-7 text-sm text-slate-300 text-left ">
                    {formData?.role || "Not provided"}
                  </p>
                )}
              </div>

              {/* Location */}

              <div>
                <label className="text-xs text-slate-500">Location</label>

                {isEditing ? (
                  <input
                    type="text"
                    name="location"
                    value={formData?.location}
                    onChange={handleChange}
                    className="mt-2 w-full border-b border-white/[0.08] bg-transparent py-2 text-sm text-slate-200 outline-none transition focus:border-indigo-500"
                  />
                ) : (
                  <p className="mt-2 ml-7 text-sm text-slate-300 text-left ">
                    {formData?.location || "Not provided"}
                  </p>
                )}
              </div>

              {/* Phone */}

              <div>
                <label className="text-xs text-slate-500">Phone</label>

                {isEditing ? (
                  <input
                    type="text"
                    name="phone"
                    value={formData?.phone}
                    onChange={handleChange}
                    placeholder="Enter phone number"
                    className="mt-2 w-full border-b border-white/[0.08] bg-transparent py-2 text-sm text-slate-200 placeholder:text-slate-700 outline-none transition focus:border-indigo-500"
                  />
                ) : (
                  <p className="mt-2 ml-7 text-sm text-slate-300 text-left ">
                    {formData?.phone || "Not provided"}
                  </p>
                )}
              </div>

              {/* Website */}

              <div>
                <label className="text-xs text-slate-500">Website</label>

                {isEditing ? (
                  <input
                    type="text"
                    name="website"
                    value={formData?.website}
                    onChange={handleChange}
                    placeholder="https://example.com"
                    className="mt-2 w-full border-b border-white/[0.08] bg-transparent py-2 text-sm text-slate-200 placeholder:text-slate-700 outline-none transition focus:border-indigo-500"
                  />
                ) : (
                  <p className="mt-2 ml-7 text-sm text-slate-300 text-left ">
                    {formData?.website || "Not provided"}
                  </p>
                )}
              </div>
            </div>
          </section>

          {/* ABOUT */}

          <section className="border-t border-white/[0.06] px-6 py-7 sm:px-8">
            <div>
              <h2 className="text-sm font-semibold text-slate-200">About</h2>

              <p className="mt-1 text-xs text-slate-500">
                A short introduction about yourself.
              </p>
            </div>

            {isEditing ? (
              <textarea
                name="bio"
                value={formData?.bio}
                onChange={handleChange}
                rows={4}
                placeholder="Tell us a little about yourself..."
                className="mt-5 w-full resize-none rounded-xl border border-white/[0.07] bg-[#080b14] px-4 py-3 text-sm leading-6 text-slate-300 placeholder:text-slate-700 outline-none transition focus:border-indigo-500/50"
              />
            ) : (
              <p className="mt-5 max-w-3xl text-sm leading-7 text-slate-500">
                {formData?.bio || "No bio added yet."}
              </p>
            )}
          </section>

          {/* SOCIAL LINKS */}

          <section className="border-t border-white/[0.06] px-6 py-7 sm:px-8">
            <div>
              <h2 className="text-sm font-semibold text-slate-200">
                Professional links
              </h2>

              <p className="mt-1 text-xs text-slate-600">
                Add links to your professional profiles.
              </p>
            </div>

            <div className="mt-6 grid gap-x-8 gap-y-6 sm:grid-cols-2">
              {/* GitHub */}

              <div>
                <label className="text-xs text-slate-600">GitHub</label>

                {isEditing ? (
                  <input
                    type="text"
                    name="github"
                    value={formData?.github}
                    onChange={handleChange}
                    placeholder="https://github.com/username"
                    className="mt-2 w-full border-b border-white/[0.08] bg-transparent py-2 text-sm text-slate-200 placeholder:text-slate-700 outline-none transition focus:border-indigo-500"
                  />
                ) : (
                  <p className="mt-2 text-sm text-slate-400 text-left">
                    {formData?.github || "Not provided"}
                  </p>
                )}
              </div>

              {/* LinkedIn */}

              <div>
                <label className="text-xs text-slate-600">LinkedIn</label>

                {isEditing ? (
                  <input
                    type="text"
                    name="linkedin"
                    value={formData?.linkedin}
                    onChange={handleChange}
                    placeholder="https://linkedin.com/in/username"
                    className="mt-2 w-full border-b border-white/[0.08] bg-transparent py-2 text-sm text-slate-200 placeholder:text-slate-700 outline-none transition focus:border-indigo-500"
                  />
                ) : (
                  <p className="mt-2 text-sm text-slate-400 text-left">
                    {formData?.linkedin || "Not provided"}
                  </p>
                )}
              </div>
            </div>
          </section>

          {/* ACCOUNT */}

          <section className="border-t border-white/[0.06] px-6 py-7 sm:px-8">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-sm font-semibold text-slate-200">
                  Account
                </h2>

                <p className="mt-1 text-xs text-slate-600">
                  Manage your JobTrack account.
                </p>
              </div>

              <button
                type="button"
                className="flex w-fit items-center gap-2 rounded-xl border border-red-500/10 bg-red-500/[0.03] px-4 py-2.5 text-sm text-red-400 transition hover:bg-red-500/10"
              >
                Delete account
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default Profile;
