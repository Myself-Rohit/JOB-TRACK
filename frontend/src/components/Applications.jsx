import { useState } from "react";
import {
  Search,
  Plus,
  SlidersHorizontal,
  ArrowUpDown,
  Star,
  MapPin,
  CalendarDays,
  ExternalLink,
  MoreHorizontal,
  Pencil,
  Trash2,
  BriefcaseBusiness,
  Clock,
  ChevronDown,
} from "lucide-react";
import { Link } from "react-router-dom";
import useGetAllApplications from "../hooks/useGetAllApplications";
import { useEffect } from "react";
import useUpdateApplication from "../hooks/useUpdateApplication";
const statusStyles = {
  Saved: "bg-cyan-500/10 text-cyan-300 border-cyan-500/20",

  Applied: "bg-indigo-500/10 text-indigo-300 border-indigo-500/20",

  Interviewing: "bg-yellow-500/10 text-yellow-300 border-yellow-500/20",

  Offer: "bg-emerald-500/10 text-emerald-300 border-emerald-500/20",

  Rejected: "bg-red-500/10 text-red-300 border-red-500/20",

  Withdrawn: "bg-slate-500/10 text-slate-400 border-slate-500/20",
};

const companyColors = [
  "from-orange-500 to-yellow-500",
  "from-blue-500 to-cyan-500",
  "from-purple-500 to-indigo-500",
  "from-pink-500 to-red-500",
];

function Applications() {
  const [search, setSearch] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [filteredData, setFilteredData] = useState([]);
  const [isFavorite, setisFavorite] = useState(false);
  const { loding, applications, setApplications } = useGetAllApplications();
  const { updateApplication } = useUpdateApplication();

  useEffect(() => {
    setApplications(applications);
    if (applications) setFilteredData(applications);
  }, [applications]);

  const lengthCount = {
    Saved: applications?.filter((app) => app.status === "Saved").length || 0,
    Applied:
      applications?.filter((app) => app.status === "Applied").length || 0,
    Interviewing:
      applications?.filter((app) => app.status === "Interviewing").length || 0,
    Offer: applications?.filter((app) => app.status === "Offer").length || 0,
    Rejected:
      applications?.filter((app) => app.status === "Rejected").length || 0,
    Withdrawn:
      applications?.filter((app) => app.status === "Withdrawn").length || 0,
  };
  const handleChange = async (e, idx, fav = false) => {
    let updatedApplication = {};
    console.log("name:", e.target.name);
    console.log("val:", e.target.value);
    if (fav) {
      updatedApplication = {
        ...applications[idx],
        isFavorite: !applications[idx].isFavorite,
      };
    } else {
      updatedApplication = {
        ...applications[idx],
        [e.target.name]: e.target.value,
      };
    }
    setApplications((prev) =>
      prev.map((application, index) =>
        index === idx ? updatedApplication : application,
      ),
    );
    const result = await updateApplication(updatedApplication);
  };

  const handleStatusFilter = (status) => {
    setFilteredData(applications.filter((app) => app.status === status));
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setFilteredData(
      applications.filter(
        (app) =>
          app.company.toLowerCase().includes(e.target.value.trim()) ||
          app.role.toLowerCase().includes(e.target.value.trim()) ||
          app.location.toLowerCase().includes(e.target.value.trim()),
      ),
    );
  };

  const formatDate = (date) => {
    if (!date) return "-";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };
  if (loding) return null;

  return (
    <div className="min-h-screen bg-[#080b14] text-white max-w-[calc(100vw-68px)] overflow-hidden grow">
      <main className=" min-h-screen px-6 py-8 ">
        <div className="mx-auto">
          {/* Header */}
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
                Applications
              </h1>

              <p className="mt-2 text-slate-400">
                Track and manage all your job applications.
              </p>
            </div>

            <Link
              to="/applications/new"
              className="flex w-fit items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-500 px-5 py-3 text-sm font-semibold shadow-lg shadow-indigo-950/30 transition hover:brightness-110"
            >
              <Plus className="h-4 w-4" />
              New application
            </Link>
          </div>
        </div>
        {/* Filters */}
        <div className=" flex flex-col md:flex-row justify-between gap-4 mt-10">
          <div className="w-2/3 relative ">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />

            <input
              type="text"
              placeholder="Search company, role or location..."
              value={search}
              onChange={(e) => handleSearchChange(e)}
              className="min-w-full rounded-xl border border-white/[0.07] bg-[#1d1f246f] py-3 pl-11 pr-4 text-sm text-white outline-none placeholder:text-slate-600 focus:border-indigo-500"
            />
          </div>

          <div
            className="py-2 px-4 w-32 flex gap-2 rounded-xl border border-white/[0.07] bg-[#1d1f246f] text-slate-500 hover:text-slate-400"
            onClick={() =>
              setFilteredData(
                applications.filter((app) => app.isFavorite === true),
              )
            }
          >
            <Star className="w-4" />
            Favorites
          </div>
        </div>
        <div className="flex items-center flex-wrap  gap-2  mt-4 w-full">
          <div
            className="px-2 flex items-center gap-1 rounded-full text-sm border border-white/[0.07] bg-[#1d1f246f] text-slate-500 hover:text-slate-400"
            onClick={() => setFilteredData(applications)}
          >
            All<span className="mb-2">.</span>
            {applications && applications.length}
          </div>

          <div
            className=" px-2 flex items-center gap-1 rounded-full text-sm border border-white/[0.07] bg-[#1d1f246f] text-slate-500 hover:text-slate-400"
            onClick={() => handleStatusFilter("Saved")}
          >
            Saved <span className="mb-2">.</span> {lengthCount.Saved}
          </div>
          <div
            className=" px-2 flex items-center gap-1 rounded-full text-sm border border-white/[0.07] bg-[#1d1f246f] text-slate-500 hover:text-slate-400"
            onClick={() => handleStatusFilter("Applied")}
          >
            Applied <span className="mb-2">.</span> {lengthCount.Applied}
          </div>
          <div
            className=" px-2 flex items-center gap-1 rounded-full text-sm border border-white/[0.07] bg-[#1d1f246f] text-slate-500 hover:text-slate-400"
            onClick={() => handleStatusFilter("Interviewing")}
          >
            Interviewing <span className="mb-2">.</span>{" "}
            {lengthCount.Interviewing}
          </div>
          <div
            className=" px-2 flex items-center gap-1 rounded-full text-sm border border-white/[0.07] bg-[#1d1f246f] text-slate-500 hover:text-slate-400"
            onClick={() => handleStatusFilter("Offer")}
          >
            Offer <span className="mb-2">.</span> {lengthCount.Offer}
          </div>
          <div
            className=" px-2 flex items-center gap-1 rounded-full text-sm border border-white/[0.07] bg-[#1d1f246f] text-slate-500 hover:text-slate-400"
            onClick={() => handleStatusFilter("Rejected")}
          >
            Rejected <span className="mb-2">.</span> {lengthCount.Rejected}
          </div>
          <div
            className=" px-2 flex items-center gap-1 rounded-full text-sm border border-white/[0.07] bg-[#1d1f246f] text-slate-500 hover:text-slate-400"
            onClick={() => handleStatusFilter("Withdrawn")}
          >
            Withdrawn <span className="mb-2">.</span> {lengthCount.Withdrawn}
          </div>
        </div>

        <div className="mt-4 space-y-3 w-full min-w-0">
          <div className="w-full max-w-full overflow-x-auto overflow-y-hidden rounded-3xl border border-white/[0.08] bg-[#0b0f1a]">
            <table className="w-full min-w-[1000px] border-collapse">
              <thead>
                <tr className="border-b border-white/[0.07] text-sm ">
                  <th className="pl-10 py-6 text-left text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
                    Application
                  </th>

                  <th className="px-5 py-6 text-center text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
                    Status
                  </th>

                  <th className="pl-10 py-6 text-center text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
                    Applied
                  </th>

                  <th className="pr-10 py-6 text-right text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredData &&
                  filteredData.map((application, index) => (
                    <tr
                      key={application._id}
                      className="border-b border-white/[0.06] last:border-b-0 hover:bg-white/[0.02] "
                    >
                      {/* Application */}
                      <td className=" px-4">
                        <span className="flex items-center gap-6 text-xs ">
                          <span
                            className={`flex h-14 w-14  items-center justify-center rounded-xl ${application.color} text-sm font-semibold text-white`}
                          >
                            {application.company}
                          </span>

                          <span>
                            <p className="text-sm font-medium text-slate-100 w-48">
                              {application.role}
                            </p>

                            <p className="mt-1 text-sm text-slate-500">
                              {application.company}
                              <span className="mx-1">·</span>
                              {application.location}
                            </p>
                          </span>
                        </span>
                      </td>
                      {/* Status */}
                      <td className="min-w-40">
                        <span className="relative ">
                          <select
                            name="status"
                            value={application.status}
                            onChange={(e) => handleChange(e, index)}
                            className={`w-full text-xs appearance-none rounded-xl border border-white/[0.1] bg-[#111827] px-2 py-2 text-[16px] outline-none ${statusStyles[application.status]}`}
                          >
                            <option>Saved</option>
                            <option>Applied</option>
                            <option>Interviewing</option>
                            <option>Offer</option>
                            <option>Rejected</option>
                            <option>Withdrawn</option>
                          </select>

                          <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                        </span>
                      </td>
                      {/* Applied */}
                      <td className="px-5 py-7 min-w-40 text-center ">
                        <span className="whitespace-pre-line text-sm text-slate-400">
                          {formatDate(application?.appliedDate)}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="px-6 py-4">
                        <span
                          className="flex items-center justify-end gap-7 "
                          onClick={(e) => handleChange(e, index, true)}
                        >
                          <Star
                            className={`h-5 w-5  ${
                              application.isFavorite
                                ? "fill-yellow-400 text-yellow-400"
                                : "text-slate-500"
                            }`}
                          />

                          {application.jobUrl && (
                            <a href={`${application.jobUrl}`}>
                              <ExternalLink className="h-5 w-5 text-slate-500" />
                            </a>
                          )}

                          <Trash2 className="h-5 w-5 text-slate-500" />
                        </span>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
            {filteredData.length == 0 && (
              <div className="mt-4 rounded-2xl border border-dashed border-white/[0.1] bg-[#0d111c] px-6 py-20 text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-500/10">
                  <Search className="h-6 w-6 text-indigo-300" />
                </div>

                <h3 className="mt-5 font-semibold">No applications found</h3>

                <p className="mt-2 text-sm text-slate-500">
                  Try changing your search or filters.
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default Applications;
