import { useEffect, useState } from "react";
import {
  ArrowLeft,
  Building2,
  MapPin,
  BriefcaseBusiness,
  Link as LinkIcon,
  CalendarDays,
  FileText,
  Star,
  Video,
} from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import useUpdateApplication from "../hooks/useUpdateApplication.js";
import useGetAllApplications from "../hooks/useGetAllApplications";
import useGetApplication from "../hooks/useGetApplication";
import { toast } from "react-toastify";

function EditApplication() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { application, setApplication } = useGetApplication(id);
  const { updateApplication } = useUpdateApplication();
  const colors = [
    "from-orange-500 to-yellow-500",
    "from-blue-500 to-cyan-500",
    "from-purple-500 to-violet-500",
    "from-indigo-500 to-blue-500",
    "from-green-500 to-emerald-500",
    "from-red-500 to-orange-500",
    "from-pink-500 to-rose-500",
    "from-fuchsia-500 to-pink-500",
    "from-cyan-500 to-teal-500",
    "from-amber-500 to-orange-500",
    "from-sky-500 to-indigo-500",
    "from-violet-500 to-fuchsia-500",
  ];
  const [isActive, setIsActive] = useState(0);
  const handleLogo = (idx) => {
    setIsActive(idx);
    setFormData((prev) => ({
      ...prev,
      color: colors[idx],
    }));
  };
  const [formData, setFormData] = useState({
    company: "",
    role: "",
    location: "",
    status: "Applied",
    appliedDate: "",
    jobUrl: "",
    isFavorite: false,
    minSalary: "",
    maxSalary: "",
    currency: "USD",
    contactName: "",
    contactEmail: "",
    notes: "",
    interview: {
      scheduled: false,
      date: "",
      type: "Technical",
      notes: "",
    },
    color: "from-orange-500 to-yellow-500",
  });
  useEffect(() => {
    if (application) {
      setFormData({ ...application });
    }
  }, [application]);
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleInterviewChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      interview: {
        ...prev.interview,
        [e.target.name]: e.target.value,
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    updateApplication(formData);
    toast.success("Application data updated.");
  };

  return (
    <div className=" bg-[#080b14] text-white grow">
      <main className="  px-6 py-8 ">
        <div className="mx-auto max-w-4xl">
          <Link
            to="/applications"
            className="mb-6 inline-flex items-center gap-2 text-sm text-slate-400 transition hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Link>

          <div>
            <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
              Track a new application
            </h1>

            <p className="mt-2 text-slate-400 text-left">
              Add a job application to keep track of your progress.
            </p>
          </div>
          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <section className="rounded-2xl border border-white/[0.07] bg-[#0d111c] p-6">
              <div className="mb-6">
                <h2 className="text-lg font-semibold">Job information</h2>

                <p className="mt-1 text-sm text-slate-500 text-left">
                  Basic details about the position.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-5 md:grid-cols-2 ">
                <div>
                  <span className="mb-2 block text-sm font-medium text-slate-400">
                    Company <span className="text-red-400">*</span>
                  </span>

                  <div className="relative">
                    <Building2 className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />

                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder="e.g. Google"
                      required
                      className="w-full rounded-xl  bg-[#080c16] py-3 pl-10 pr-4 text-sm text-white outline-none outline-1 placeholder:text-slate-600 focus:outline-indigo-500 "
                    />
                  </div>
                </div>

                {/* Role */}
                <div>
                  <span className="mb-2 block text-sm font-medium text-slate-400">
                    Job role <span className="text-red-400">*</span>
                  </span>

                  <div className="relative">
                    <BriefcaseBusiness className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />

                    <input
                      type="text"
                      name="role"
                      value={formData.role}
                      onChange={handleChange}
                      placeholder="e.g. Frontend Developer"
                      required
                      className="w-full rounded-xl  bg-[#080c16] py-3 pl-10 pr-4 text-sm text-white outline-none  placeholder:text-slate-600 outline-1 focus:outline-indigo-500"
                    />
                  </div>
                </div>

                {/* Location */}
                <div>
                  <span className="mb-2 block text-sm font-medium text-slate-400">
                    Location
                  </span>

                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />

                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      placeholder="e.g. Bangalore, India / Remote"
                      className="w-full rounded-xl  bg-[#080c16] py-3 pl-10 pr-4 text-sm text-white outline-none placeholder:text-slate-600 outline-1 focus:outline-indigo-500"
                    />
                  </div>
                </div>

                {/* Status */}
                <div>
                  <span className="mb-2 block text-sm font-medium text-slate-400">
                    Status
                  </span>

                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="w-full rounded-xl  bg-[#080c16] px-4 py-3 text-sm text-slate-300 outline-none outline-1 focus:outline-indigo-500"
                  >
                    <option value="Saved">Saved</option>
                    <option value="Applied">Applied</option>
                    <option value="Interviewing">Interviewing</option>
                    <option value="Offer">Offer</option>
                    <option value="Rejected">Rejected</option>
                    <option value="Withdrawn">Withdrawn</option>
                  </select>
                </div>

                {/* Applied Date */}
                <div>
                  <span className="mb-2 block text-sm font-medium text-slate-400">
                    Applied date
                  </span>

                  <div className="relative">
                    <CalendarDays className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />

                    <input
                      type="date"
                      name="appliedDate"
                      value={formData.appliedDate}
                      onChange={handleChange}
                      className="w-full rounded-xl  bg-[#080c16] py-3 pl-10 pr-4 text-sm text-slate-300 outline-none outline-1 focus:outline-indigo-500"
                    />
                  </div>
                </div>

                {/* Job URL */}
                <div>
                  <span className="mb-2 block text-sm font-medium text-slate-400">
                    Job URL
                  </span>

                  <div className="relative">
                    <LinkIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />

                    <input
                      type="url"
                      name="jobUrl"
                      value={formData.jobUrl}
                      onChange={handleChange}
                      placeholder="https://..."
                      className="w-full rounded-xl  bg-[#080c16] py-3 pl-10 pr-4 text-sm text-white outline-none placeholder:text-slate-600 outline-1 focus:outline-indigo-500"
                    />
                  </div>
                </div>
              </div>
            </section>

            <section className="rounded-2xl border border-white/[0.07] bg-[#0d111c] p-6">
              <div className="mb-6">
                <h2 className="text-lg font-semibold">Salary Information</h2>

                <p className="mt-1 text-sm text-slate-500 text-left">
                  Basic details about the salary.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-5 md:grid-cols-2 ">
                <div>
                  <span className="mb-2 block text-sm font-medium text-slate-400">
                    Salary min
                  </span>

                  <div className="relative">
                    <Building2 className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />

                    <input
                      type="number"
                      name="minSalary"
                      value={formData.minSalary}
                      onChange={handleChange}
                      placeholder="90000"
                      className="w-full rounded-xl  bg-[#080c16] py-3 pl-10 pr-4 text-sm text-white outline-none placeholder:text-slate-600 outline-1 focus:outline-indigo-500 "
                    />
                  </div>
                </div>

                <div>
                  <span className="mb-2 block text-sm font-medium text-slate-300">
                    Salary max
                  </span>

                  <div className="relative">
                    <Building2 className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />

                    <input
                      type="number"
                      name="maxSalary"
                      value={formData.maxSalary}
                      onChange={handleChange}
                      placeholder="90000"
                      className="w-full rounded-xl  bg-[#080c16] py-3 pl-10 pr-4 text-sm text-white outline-none placeholder:text-slate-600 outline-1 focus:outline-indigo-500"
                    />
                  </div>
                </div>

                {/* Status */}
                <div>
                  <span className="mb-2 block text-sm font-medium text-slate-300">
                    Currency
                  </span>

                  <select
                    name="currency"
                    value={formData.currency}
                    onChange={handleChange}
                    className="w-full rounded-xl  bg-[#080c16] px-4 py-3 text-sm text-slate-300 outline-none outline-1 focus:outline-indigo-500"
                  >
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                    <option value="GBP">GBP</option>
                    <option value="CAD">CAD</option>
                    <option value="AUD">AUD</option>
                    <option value="INR">INR</option>
                  </select>
                </div>
              </div>
            </section>

            {/* Interview */}
            <section className="rounded-2xl border border-white/[0.07] bg-[#0d111c] p-6">
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-yellow-500/10">
                  <Video className="h-5 w-5 text-yellow-300" />
                </div>

                <div>
                  <h2 className="text-lg font-semibold">Interview details</h2>

                  <p className="text-sm text-slate-500">
                    Keep track of your upcoming interview.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                {/* Interview Date */}
                <div>
                  <span className="mb-2 block text-sm font-medium text-slate-400">
                    Interview date
                  </span>

                  <input
                    type="date"
                    name="date"
                    value={formData.interview.date}
                    onChange={handleInterviewChange}
                    className="w-full rounded-xl  bg-[#080c16] px-4 py-3 text-sm text-slate-400 outline-none outline-1 focus:outline-indigo-500"
                  />
                </div>

                {/* Interview Type */}
                <div>
                  <span className="mb-2 block text-sm font-medium text-slate-400">
                    Interview type
                  </span>

                  <select
                    name="type"
                    value={formData.interview.type}
                    onChange={handleInterviewChange}
                    className="w-full rounded-xl  bg-[#080c16] px-4 py-3 text-sm text-slate-400 outline-none outline-1 focus:outline-indigo-500"
                  >
                    <option value="HR">HR</option>
                    <option value="Technical">Technical</option>
                    <option value="Managerial">Managerial</option>
                    <option value="Behavioral">Behavioral</option>
                    <option value="Final">Final</option>
                  </select>
                </div>

                {/* Interview Notes */}
                <div className="md:col-span-2">
                  <span className="mb-2 block text-sm font-medium text-slate-400">
                    Interview notes
                  </span>

                  <textarea
                    name="notes"
                    value={formData.interview.notes}
                    onChange={handleInterviewChange}
                    rows="3"
                    placeholder="Interviewer's name, meeting link, preparation notes..."
                    className="w-full resize-none rounded-xl  bg-[#080c16] px-4 py-3 text-sm text-white outline-none placeholder:text-slate-600 outline-1 focus:outline-indigo-500"
                  />
                </div>
              </div>
            </section>

            {/* Contact */}
            <section className="rounded-2xl border border-white/[0.07] bg-[#0d111c] p-6">
              <div className="mb-6">
                <h2 className="text-lg font-semibold">Contacts & notes</h2>
              </div>

              <div className="grid grid-cols-1 gap-5 md:grid-cols-2 ">
                <div>
                  <span className="mb-2 block text-sm font-medium text-slate-400">
                    Contact Name
                  </span>

                  <div className="relative">
                    <Building2 className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />

                    <input
                      type="text"
                      name="contactName"
                      value={formData.contactName}
                      onChange={handleChange}
                      placeholder="e.g. Jane Recruiter"
                      className="w-full rounded-xl  bg-[#080c16] py-3 pl-10 pr-4 text-sm text-white outline-none outline-1 placeholder:text-slate-600 focus:outline-indigo-500 "
                    />
                  </div>
                </div>
                {/* Contact Email */}
                <div>
                  <span className="mb-2 block text-sm font-medium text-slate-400">
                    Contact Email
                  </span>

                  <div className="relative">
                    <BriefcaseBusiness className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />

                    <input
                      type="text"
                      name="contactEmail"
                      value={formData.contactEmail}
                      onChange={handleChange}
                      placeholder="e.g. jane@company.com"
                      className="w-full rounded-xl  bg-[#080c16] py-3 pl-10 pr-4 text-sm text-white outline-none  placeholder:text-slate-600 outline-1 focus:outline-indigo-500"
                    />
                  </div>
                </div>

                {/* Notes */}
                <div className="md:col-span-2">
                  <span className="mb-2 block text-sm font-medium text-slate-400">
                    NOTES
                  </span>

                  <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    rows="3"
                    placeholder="Interviewer's name, meeting link, preparation notes..."
                    className="w-full resize-none rounded-xl  bg-[#080c16] px-4 py-3 text-sm text-white outline-none placeholder:text-slate-600 outline-1 focus:outline-indigo-500"
                  />
                </div>
              </div>

              {/* favorite */}
              <div className="text-slate-400 mt-4">
                <input
                  type="checkbox"
                  name="isFavorite"
                  value={formData.isFavorite}
                  onChange={(e) => {
                    setFormData((prev) => ({
                      ...prev,
                      [e.target.name]: !formData.isFavorite,
                    }));
                  }}
                  className=" bg-transparent mr-2 "
                />
                Mark as a favorite — this is a dream role
              </div>
            </section>

            {/* Buttons */}
            <div className="flex flex-col-reverse items-center justify-between gap-3 border-t border-white/[0.06] pt-6 sm:flex-row">
              <div className="flex flex-col gap-2">
                <span className="text-slate-400">Choose Company Logo</span>
                <div className="flex gap-4 flex-wrap max-w-56">
                  {colors.map((color, idx) => (
                    <div
                      onClick={(e) => {
                        handleLogo(idx);
                      }}
                      key={idx}
                      name="color"
                      value={colors[idx]}
                      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl opacity-10 hover:opacity-100  ${isActive == idx && "opacity-100"} duration-300 bg-gradient-to-br ${colors[idx]} text-xs font-bold text-white cursor-pointer`}
                    >
                      {formData?.company
                        .split(" ")
                        .map((word) => word[0])
                        .join("")
                        .slice(0, 2)}
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex flex-col-reverse justify-end gap-3  sm:flex-row">
                <Link
                  to="/applications"
                  className="rounded-xl  px-6 py-3 text-center text-sm font-medium text-slate-300 transition hover:bg-white/[0.04] hover:text-white"
                >
                  Cancel
                </Link>

                <button
                  type="submit"
                  className="rounded-xl bg-gradient-to-r from-indigo-500 to-violet-500 px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-950/40 transition hover:brightness-110"
                >
                  Update application
                </button>
              </div>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}

export default EditApplication;
