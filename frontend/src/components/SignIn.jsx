import React, { useState } from "react";
import { Link } from "react-router";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  BriefcaseBusiness,
  ArrowRight,
} from "lucide-react";
import useSignin from "../hooks/useSignin.js";
import useSignup from "../hooks/useSignup.js";

function Signin() {
  const [showPassword, setShowPassword] = useState(false);
  const [isSignIn, setIsSignIn] = useState(true);
  const { signin } = useSignin();
  const { signup } = useSignup();

  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    isSignIn ? signin(formData) : signup(formData);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-[#080b14] text-white">
      <div className="flex min-h-screen items-center justify-center px-4 py-10">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-500 shadow-lg shadow-indigo-950/40">
              <BriefcaseBusiness className="h-6 w-6 text-white" />
            </div>

            <h1 className="text-2xl font-bold tracking-tight">Welcome back</h1>

            <p className="mt-2 text-sm text-slate-500">
              Sign in to continue managing your applications.
            </p>
          </div>

          {/* Card */}
          <div className="rounded-2xl border border-white/[0.07] bg-[#0d111c] p-6 shadow-2xl shadow-black/20 sm:p-8">
            <form className="space-y-5" onSubmit={handleSubmit}>
              {/* Username */}
              {!isSignIn && (
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-300">
                    Full Name
                  </label>

                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-600" />

                    <input
                      onChange={(e) => handleChange(e)}
                      type="text"
                      name="userName"
                      placeholder="you@example.com"
                      className="h-12 w-full rounded-xl border border-white/[0.07] bg-[#101522] pl-10 pr-4 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-indigo-500/40 focus:ring-4 focus:ring-indigo-500/[0.06]"
                    />
                  </div>
                </div>
              )}
              {/* Email */}
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-300">
                  Email address
                </label>

                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-600" />

                  <input
                    onChange={(e) => handleChange(e)}
                    type="email"
                    name="email"
                    placeholder="you@example.com"
                    className="h-12 w-full rounded-xl border border-white/[0.07] bg-[#101522] pl-10 pr-4 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-indigo-500/40 focus:ring-4 focus:ring-indigo-500/[0.06]"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <label className="text-sm font-medium text-slate-300">
                    Password
                  </label>

                  <button
                    type="button"
                    className="text-xs font-medium text-indigo-400 hover:text-indigo-300"
                  >
                    Forgot password?
                  </button>
                </div>

                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-600" />

                  <input
                    onChange={(e) => handleChange(e)}
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Enter your password"
                    className="h-12 w-full rounded-xl border border-white/[0.07] bg-[#101522] pl-10 pr-11 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-indigo-500/40 focus:ring-4 focus:ring-indigo-500/[0.06]"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-600 transition hover:text-slate-300"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="group flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-500 text-sm font-semibold text-white shadow-lg shadow-indigo-950/30 transition hover:-translate-y-0.5 hover:shadow-indigo-500/20"
              >
                {isSignIn ? "Sign in" : "Sign up"}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
            </form>

            {/* Signup */}
            <div className="mt-6 border-t border-white/[0.06] pt-6 text-center">
              <p className="text-sm text-slate-500">
                Don't have an account?{" "}
                <Link
                  onClick={() => setIsSignIn(!isSignIn)}
                  className="font-semibold text-indigo-400 transition hover:text-indigo-300"
                >
                  {isSignIn ? "Create account" : "Sign in"}
                </Link>
              </p>
            </div>
          </div>

          <p className="mt-6 text-center text-xs text-slate-700">
            © 2026 JobTrack. Keep your career organized.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signin;
