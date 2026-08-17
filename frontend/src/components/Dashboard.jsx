import {
  BriefcaseBusiness,
  CheckCircle2,
  Clock3,
  XCircle,
  Trophy,
  CalendarDays,
  ArrowUpRight,
  Plus,
  ChevronRight,
} from "lucide-react";
import { Link } from "react-router-dom";
import useGetAllApplications from "../hooks/useGetAllApplications.js";
import { useEffect, useState } from "react";

function Dashboard() {
  const { loading, applications, setApplications } = useGetAllApplications();
  if (loading)
    return (
      <div className="bg-[#080b14] w-screen flex flex-col items-center justify-center gap-4 ">
        <div className="bg-[#0b0f1a] w-[80%] h-60 my-4"></div>
        <div className="bg-[#0b0f1a] w-[80%] h-60 my-4"></div>
        <div className="bg-[#0b0f1a] w-[80%] h-60 my-4"></div>
      </div>
    );

  const interviews =
    applications
      ?.filter(
        (application) =>
          application.interview?.scheduled && application.interview?.date,
      )
      .sort(
        (a, b) => new Date(a.interview.date) - new Date(b.interview.date),
      ) || [];

  const recentApplications = [...(applications || [])]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5);

  if (!applications) return null;

  const stats = [
    {
      label: "Total applications",
      status: "All",
      value: 0,
      icon: BriefcaseBusiness,
      description: "All applications",
      iconStyle: "bg-indigo-500/10 text-indigo-400",
    },
    {
      label: "Applied",
      status: "Applied",
      value: 0,
      icon: ArrowUpRight,
      description: "Currently active",
      iconStyle: "bg-blue-500/10 text-blue-400",
    },
    {
      label: "Interviews",
      status: "Interviewing",
      value: 0,
      icon: CalendarDays,
      description: "Upcoming interviews",
      iconStyle: "bg-violet-500/10 text-violet-400",
    },
    {
      label: "Offers",
      status: "Offer",
      value: 0,
      icon: Trophy,
      description: "Offers received",
      iconStyle: "bg-emerald-500/10 text-emerald-400",
    },
  ];

  const statusStyles = {
    Saved: "bg-violet-500/10 text-violet-400 border-violet-500/20",
    Applied: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    Interviewing: "bg-violet-500/10 text-violet-400 border-violet-500/20",
    Interviewing: "bg-yellow-500/10 text-yellow-300 border-yellow-500/20",
    Offer: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    Rejected: "bg-red-500/10 text-red-400 border-red-500/20",
  };

  const lengthCount = {
    All: applications.length || 0,
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
  applications.length &&
    stats.map((st) => {
      if (st.status == "All") st.value = applications.length;
      else st.value = lengthCount[st.status];
    });

  const formatDate = (date) => {
    if (!date) return "-";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };
  return (
    <main className="min-h-screen w-full bg-[#080b14] px-4 py-6 text-white sm:px-6 lg:px-8">
      {/* Header */}
      <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
        <div>
          <p className="mb-2 text-sm font-medium text-indigo-400">
            Welcome back 👋
          </p>

          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
            Dashboard
          </h1>

          <p className="mt-2 text-sm text-slate-400">
            Here's an overview of your job search.
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

      {/* Stats */}
      <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.label}
              className="rounded-2xl border border-white/[0.07] bg-[#0b0f1a] p-5 transition hover:border-white/[0.12] hover:bg-[#0d121e]"
            >
              <div className="flex items-start justify-between">
                <div
                  className={`flex h-11 w-11 items-center justify-center rounded-xl ${stat.iconStyle}`}
                >
                  <Icon className="h-5 w-5" />
                </div>

                <ArrowUpRight className="h-4 w-4 text-slate-700" />
              </div>

              <p className="mt-5 text-sm text-slate-400">{stat.label}</p>

              <div className="mt-1 flex items-end gap-2">
                <h2 className="text-3xl font-bold tracking-tight">
                  {stat.value}
                </h2>
              </div>

              <p className="mt-2 text-xs text-slate-600">{stat.description}</p>
            </div>
          );
        })}
      </div>

      {/* Main content */}
      <div className="mt-6 grid gap-6 xl:grid-cols-[1fr_380px]">
        {/* Recent Applications */}
        <section className="min-w-0 rounded-2xl border border-white/[0.07] bg-[#0b0f1a]">
          <div className="flex items-center justify-between border-b border-white/[0.06] px-5 py-5">
            <div>
              <h2 className="font-semibold text-slate-100">
                Recent applications
              </h2>

              <p className="mt-1 text-xs text-slate-500">
                Your latest job applications
              </p>
            </div>

            <Link
              to="/applications"
              className="flex items-center gap-1 text-xs font-medium text-indigo-400 hover:text-indigo-300"
            >
              View all
              <ChevronRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="divide-y divide-white/[0.05]">
            {recentApplications.map((application) => (
              <div
                key={`${application.company}-${application.role}`}
                className="flex items-center gap-4 px-5 py-4 transition hover:bg-white/[0.02]"
              >
                {/* Company icon */}
                <div
                  className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${application.color} text-xs font-bold text-white`}
                >
                  {application.company
                    .split(" ")
                    .map((word) => word[0])
                    .join("")
                    .slice(0, 2)}
                </div>

                {/* Details */}
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-slate-200">
                    {application.role}
                  </p>

                  <p className="mt-1 truncate text-xs text-slate-500">
                    {application.company}
                    <span className="mx-1.5">•</span>
                    {application.location}
                  </p>
                </div>

                {/* Status */}
                <div className="hidden sm:block">
                  <span
                    className={`rounded-lg border px-2.5 py-1.5 text-[11px] font-medium ${
                      statusStyles[application.status]
                    }`}
                  >
                    {application.status}
                  </span>
                </div>

                {/* Date */}
                <p className="hidden text-xs text-slate-600 md:block">
                  {application.date}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Upcoming Interviews */}
        <section className="rounded-2xl border border-white/[0.07] bg-[#0b0f1a]">
          <div className="border-b border-white/[0.06] px-5 py-5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500/10">
                <CalendarDays className="h-5 w-5 text-violet-400" />
              </div>

              <div>
                <h2 className="font-semibold text-slate-100">
                  Upcoming interviews
                </h2>

                <p className="mt-1 text-xs text-slate-500">
                  Don't miss your next opportunity
                </p>
              </div>
            </div>
          </div>

          <div className="p-5">
            {interviews &&
              interviews.map((interview, index) => (
                <div
                  key={interview.company}
                  className={`rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 ${
                    index !== interviews.length - 1 ? "mb-3" : ""
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-sm font-semibold text-slate-200">
                        {interview.company}
                      </p>

                      <p className="mt-1 text-xs text-slate-500">
                        {interview.role}
                      </p>
                    </div>

                    <span className="rounded-lg bg-indigo-500/10 px-2 py-1 text-[10px] font-medium text-indigo-400">
                      {interview?.interview?.type}
                    </span>
                  </div>

                  <div className="mt-4 flex items-center gap-3 border-t border-white/[0.05] pt-3">
                    <Clock3 className="h-4 w-4 text-slate-600" />

                    <div className="text-xs">
                      <span className="text-slate-300">
                        {formatDate(interview?.interview?.date)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}

            {interviews.length === 0 && (
              <div className="py-10 text-center">
                <CalendarDays className="mx-auto h-8 w-8 text-slate-700" />

                <p className="mt-3 text-sm text-slate-500">
                  No upcoming interviews
                </p>
              </div>
            )}
          </div>
        </section>
      </div>

      {/* Application Progress */}
      <section className="mt-6 rounded-2xl border border-white/[0.07] bg-[#0b0f1a] p-6">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h2 className="font-semibold text-slate-100">
              Application progress
            </h2>

            <p className="mt-1 text-xs text-slate-500">
              Track how your applications are moving through the hiring process.
            </p>
          </div>

          <p className="text-sm font-medium text-indigo-400">
            {applications && applications.length} applications
          </p>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <ProgressItem
            label="Applied"
            value={lengthCount["Applied"]}
            total={applications && applications.length}
            icon={ArrowUpRight}
            color="bg-blue-500"
          />

          <ProgressItem
            label="Interviewing"
            value={lengthCount["Interviewing"]}
            total={applications && applications.length}
            icon={CalendarDays}
            color="bg-violet-500"
          />

          <ProgressItem
            label="Offers"
            value={lengthCount["Offer"]}
            total={applications && applications.length}
            icon={Trophy}
            color="bg-emerald-500"
          />
        </div>
      </section>
    </main>
  );
}

function ProgressItem({ label, value, total, icon: Icon, color }) {
  const percentage = Math.round((value / total) * 100);

  return (
    <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Icon className="h-4 w-4 text-slate-500" />

          <span className="text-sm text-slate-300">{label}</span>
        </div>

        <span className="text-xs text-slate-500">{value}</span>
      </div>

      <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/[0.05]">
        <div
          className={`h-full rounded-full ${color}`}
          style={{ width: `${percentage}%` }}
        />
      </div>

      <p className="mt-2 text-[11px] text-slate-600">
        {percentage}% of total applications
      </p>
    </div>
  );
}

export default Dashboard;
