import {
  ArrowLeft,
  BriefcaseBusiness,
  CalendarDays,
  Check,
  Clock3,
  ExternalLink,
  FileText,
  Mail,
  MapPin,
  Pencil,
  Star,
  Trash2,
  User,
  DollarSign,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router";

import useGetApplication from "../hooks/useGetApplication.js";
import useUpdateApplication from "../hooks/useUpdateApplication.js";
import useRemoveApplication from "../hooks/useRemoveApplication.js";

function ApplicationDetails() {
  const { id } = useParams();
  let navigate = useNavigate();
  const { loading, application, setApplication } = useGetApplication(id);
  const { updateApplication } = useUpdateApplication();
  const { removeApplication } = useRemoveApplication();
  const handleFavourite = async () => {
    const updatedApplication = {
      ...application,
      isFavorite: !application.isFavorite,
    };

    const result = await updateApplication(updatedApplication);
    setApplication(updatedApplication);
  };

  const formatDate = (date) => {
    if (!date) return "—";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const statusStyles = {
    Saved: {
      badge: "border-slate-500/20 bg-slate-500/10 text-slate-400",
      dot: "bg-slate-400",
    },
    Applied: {
      badge: "border-blue-500/20 bg-blue-500/10 text-blue-400",
      dot: "bg-blue-400",
    },
    Interviewing: {
      badge: "border-violet-500/20 bg-violet-500/10 text-violet-400",
      dot: "bg-violet-400",
    },
    Offer: {
      badge: "border-emerald-500/20 bg-emerald-500/10 text-emerald-400",
      dot: "bg-emerald-400",
    },
    Rejected: {
      badge: "border-red-500/20 bg-red-500/10 text-red-400",
      dot: "bg-red-400",
    },
    Withdrawn: {
      badge: "border-orange-500/20 bg-orange-500/10 text-orange-400",
      dot: "bg-orange-400",
    },
  };

  const stages = ["Saved", "Applied", "Interviewing", "Offer"];
  if (loading)
    return (
      <div className="bg-[#080b14] w-screen flex flex-col items-center justify-center gap-4 ">
        <div className="bg-[#0b0f1a] w-[80%] h-60 my-4"></div>
        <div className="bg-[#0b0f1a] w-[80%] h-60 my-4"></div>
        <div className="bg-[#0b0f1a] w-[80%] h-60 my-4"></div>
      </div>
    );
  if (!application) return null;
  const currentIndex = stages.indexOf(application?.status);

  return (
    <main className="min-h-screen bg-[#080b14] px-4 py-6 text-white sm:px-6 lg:px-10 grow">
      <div className="flex items-center justify-between">
        <Link
          to="/applications"
          className="group inline-flex items-center gap-2 text-sm text-slate-500 transition hover:text-slate-200"
        >
          <ArrowLeft className="h-4 w-4 transition group-hover:-translate-x-1" />
          Back to applications
        </Link>
      </div>

      {/* HERO */}

      <section className="mt-7 overflow-hidden rounded-3xl border border-white/[0.07] bg-[#0b0f1a]">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent" />

        <div className="p-5 sm:p-7 lg:p-8">
          <div className="flex flex-col gap-7 lg:flex-row lg:items-start lg:justify-between">
            <div className="flex min-w-0 gap-5">
              <div className="relative">
                <div
                  className={`flex h-11 w-11 md:h-18 md:w-18 items-center justify-center rounded-2xl bg-gradient-to-br ${application.color} text-xl font-bold shadow-xl shadow-orange-950/20 sm:h-20 sm:w-20`}
                >
                  {application.company
                    .split(" ")
                    .map((word) => word[0])
                    .join("")
                    .slice(0, 2)}
                </div>

                {application.isFavorite && (
                  <div className="absolute -right-2 -top-2 flex h-7 w-7 items-center justify-center rounded-full border border-[#0b0f1a] bg-yellow-400 text-[#0b0f1a]">
                    <Star className="h-3.5 w-3.5" fill="currentColor" />
                  </div>
                )}
              </div>

              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-3">
                  <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                    {application.role}
                  </h1>

                  <span
                    className={`rounded-full border px-3 py-1 text-xs font-medium ${
                      statusStyles[application.status].badge
                    }`}
                  >
                    {application.status}
                  </span>
                </div>

                <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-slate-400">
                  <span className="font-medium text-slate-200">
                    {application.company}
                  </span>

                  <span className="text-slate-700">•</span>

                  <span className="flex items-center gap-1.5">
                    <MapPin className="h-3.5 w-3.5" />
                    {application.location}
                  </span>
                </div>

                <div className="mt-3 flex items-center gap-2 text-xs text-slate-600">
                  <CalendarDays className="h-3.5 w-3.5" />
                  Applied {formatDate(application?.Applied)}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex shrink-0 items-center gap-2">
              <button
                onClick={(e) => {
                  handleFavourite();
                }}
                className={`flex h-10 w-10 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.02] transition hover:bg-white/[0.06] ${
                  application.isFavorite ? "text-yellow-400" : "text-slate-500"
                }`}
              >
                <Star
                  className="h-4 w-4"
                  fill={application.isFavorite ? "currentColor" : "none"}
                />
              </button>

              <Link
                to={`/edit/${application._id}`}
                className="flex h-10 items-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.02] px-4 text-sm font-medium text-slate-300 transition hover:bg-white/[0.06] hover:text-white"
              >
                <Pencil className="h-4 w-4" />
                Edit
              </Link>

              <button
                onClick={() => {
                  (removeApplication(application._id), navigate("/"));
                }}
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-red-500/10 bg-red-500/[0.03] text-slate-500 transition hover:bg-red-500/10 hover:text-red-400"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      <div className="mt-6 grid gap-6 xl:grid-cols-[minmax(0,1fr)_340px]">
        {/* LEFT SIDE*/}

        <div className="space-y-6">
          {/* Job overview */}
          <section className="rounded-2xl border border-white/[0.07] bg-[#0b0f1a]">
            <SectionHeader
              icon={BriefcaseBusiness}
              title="Job overview"
              subtitle="Information about this position"
              iconColor="bg-indigo-500/10 text-indigo-400"
            />

            <div className="grid gap-3 p-5 sm:grid-cols-2 lg:grid-cols-3">
              <DetailCard label="Company" value={application.company} />

              <DetailCard label="Position" value={application.role} />

              <DetailCard
                label="Location"
                value={application.location}
                icon={MapPin}
              />

              <DetailCard
                label="Applied"
                value={formatDate(application.appliedDate)}
                icon={CalendarDays}
              />

              <DetailCard
                label="Salary"
                value={`${application.currency} ${application.minSalary} – ${application.maxSalary}`}
                icon={DollarSign}
              />

              <a
                href={application.jobUrl}
                target="_blank"
                rel="noreferrer"
                className="group rounded-xl border border-white/[0.06] bg-white/[0.015] p-4 transition hover:border-indigo-500/20 hover:bg-indigo-500/[0.03]"
              >
                <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-600">
                  Job posting
                </p>

                <div className="mt-3 flex items-center justify-between">
                  <span className="text-sm font-medium text-indigo-400">
                    Open posting
                  </span>

                  <ExternalLink className="h-4 w-4 text-slate-600 transition group-hover:text-indigo-400" />
                </div>
              </a>
            </div>
          </section>

          {/* Interview */}
          <section className="rounded-2xl border border-white/[0.07] bg-[#0b0f1a]">
            <SectionHeader
              icon={CalendarDays}
              title="Interview"
              subtitle="Upcoming interview information"
              iconColor="bg-violet-500/10 text-violet-400"
            />

            {application.interview?.scheduled ? (
              <div className="p-5">
                <div className="rounded-2xl border border-violet-500/10 bg-gradient-to-br from-violet-500/[0.06] to-transparent p-5">
                  <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-violet-500/10">
                        <CalendarDays className="h-5 w-5 text-violet-400" />
                      </div>

                      <div>
                        <p className="text-base font-semibold text-white">
                          {formatDate(application.interview?.date)}
                        </p>

                        <div className="mt-1 flex items-center gap-2 text-xs text-slate-500">
                          <Clock3 className="h-3.5 w-3.5" />
                          {application.interview.type} interview
                        </div>
                      </div>
                    </div>

                    <span className="flex w-fit items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1.5 text-xs font-medium text-emerald-400">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                      Scheduled
                    </span>
                  </div>
                </div>

                <div className="mt-5">
                  <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-600">
                    Preparation notes
                  </p>

                  <div className="rounded-xl border border-white/[0.06] bg-[#080b14] p-4">
                    <p className="text-sm leading-6 text-slate-400">
                      {application.interview.notes ||
                        "No preparation notes added."}
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <EmptyState
                icon={CalendarDays}
                title="No interview scheduled"
                description="Interview details will appear here when added."
              />
            )}
          </section>

          {/* Notes */}
          <section className="rounded-2xl border border-white/[0.07] bg-[#0b0f1a]">
            <SectionHeader
              icon={FileText}
              title="Notes"
              subtitle="Your notes for this application"
              iconColor="bg-amber-500/10 text-amber-400"
            />

            <div className="p-5">
              <div className="rounded-xl border border-white/[0.06] bg-[#080b14] p-5">
                <p className="text-sm leading-7 text-slate-400">
                  {application.notes || "No notes have been added yet."}
                </p>
              </div>
            </div>
          </section>
        </div>

        {/* RIGHT SIDE */}

        <aside className="space-y-6">
          {/* Current status */}
          <section className="rounded-2xl border border-white/[0.07] bg-[#0b0f1a] p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-600">
              Current status
            </p>

            <div className="mt-4 flex items-center gap-3">
              <div
                className={`h-2.5 w-2.5 rounded-full ${
                  statusStyles[application.status].dot
                }`}
              />

              <span className="text-lg font-semibold text-white">
                {application.status}
              </span>
            </div>

            <div className="mt-5 h-1.5 overflow-hidden rounded-full bg-white/[0.05]">
              <div
                className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 transition-all"
                style={{
                  width: `${((currentIndex + 1) / stages.length) * 100}%`,
                }}
              />
            </div>

            <p className="mt-3 text-xs text-slate-600">
              Application is currently at the{" "}
              <span className="text-slate-400">
                {application.status.toLowerCase()}
              </span>{" "}
              stage.
            </p>
          </section>

          {/* Contact */}
          <section className="rounded-2xl border border-white/[0.07] bg-[#0b0f1a] p-5">
            <SectionHeader
              icon={User}
              title="Recruiter"
              subtitle="Contact information"
              iconColor="bg-cyan-500/10 text-cyan-400"
              compact
            />

            {application.contactName ? (
              <div className="mt-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/10 text-xs font-bold text-cyan-400">
                    {application.contactName
                      .split(" ")
                      .map((word) => word[0])
                      .join("")
                      .slice(0, 2)}
                  </div>

                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-slate-200">
                      {application.contactName}
                    </p>

                    <p className="mt-1 text-xs text-slate-600">Recruiter</p>
                  </div>
                </div>

                {application.contactEmail && (
                  <a
                    href={`mailto:${application.contactEmail}`}
                    className="mt-4 flex items-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] px-3.5 py-3 text-xs text-slate-400 transition hover:border-indigo-500/20 hover:text-indigo-400"
                  >
                    <Mail className="h-4 w-4 shrink-0" />

                    <span className="truncate">{application.contactEmail}</span>
                  </a>
                )}
              </div>
            ) : (
              <p className="mt-5 text-xs text-slate-600">
                No recruiter information.
              </p>
            )}
          </section>

          {/* Quick actions */}
          <section className="rounded-2xl border border-white/[0.07] bg-[#0b0f1a] p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-600">
              Quick actions
            </p>

            <div className="mt-4 space-y-2">
              <a
                href={application.jobUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 py-3 text-sm text-slate-400 transition hover:bg-white/[0.05] hover:text-white"
              >
                <ExternalLink className="h-4 w-4" />
                Open job posting
              </a>

              <Link
                to={`/edit/${application._id}`}
                className="flex items-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 py-3 text-sm text-slate-400 transition hover:bg-white/[0.05] hover:text-white"
              >
                <Pencil className="h-4 w-4" />
                Edit application
              </Link>
            </div>
          </section>
        </aside>
      </div>
    </main>
  );
}

function SectionHeader({
  icon: Icon,
  title,
  subtitle,
  iconColor,
  compact = false,
}) {
  return (
    <div
      className={`flex items-center gap-3 ${
        compact ? "" : "border-b border-white/[0.06] px-5 py-4"
      }`}
    >
      <div
        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${iconColor}`}
      >
        <Icon className="h-4 w-4" />
      </div>

      <div>
        <h2 className="text-sm font-semibold text-slate-100">{title}</h2>

        <p className="mt-0.5 text-xs text-slate-600">{subtitle}</p>
      </div>
    </div>
  );
}

function DetailCard({ label, value, icon: Icon }) {
  return (
    <div className="rounded-xl border border-white/[0.06] bg-white/[0.015] p-4">
      <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-600">
        {label}
      </p>

      <div className="mt-3 flex items-center gap-2">
        {Icon && <Icon className="h-4 w-4 shrink-0 text-slate-600" />}

        <p className="truncate text-sm font-medium text-slate-300">
          {value || "—"}
        </p>
      </div>
    </div>
  );
}

function EmptyState({ icon: Icon, title, description }) {
  return (
    <div className="px-6 py-12 text-center">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-white/[0.03]">
        <Icon className="h-5 w-5 text-slate-600" />
      </div>

      <p className="mt-4 text-sm font-medium text-slate-400">{title}</p>

      <p className="mt-1 text-xs text-slate-600">{description}</p>
    </div>
  );
}

export default ApplicationDetails;
