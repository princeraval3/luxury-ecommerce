import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";
import { loginUser, registerUser } from "../services/authService";
import { useAuth } from "../context/AuthContext";

const Auth = () => {
  const { login } = useAuth();
  const [activeTab, setActiveTab] = useState("signin"); // 'signin' or 'signup'
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  console.log(formData.name);
  

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (activeTab === "signin") {
      console.log("Logging in:", {
        email: formData.email,
        password: formData.password,
      });
    } else if (activeTab === "signup") {
      console.log("register user imformation", {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });
    }

    try {
      if (activeTab === "signin") {
        const data = await loginUser({
          email: formData.email,
          password: formData.password,
        });
        console.log("login response:", data);
        
        
        login(data.user , data.accessToken);
        
        
      } else if (activeTab === "signup") {
        const data = await registerUser({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        });
        console.log("register response", data);
      }
    } catch (error) {
      console.log(error.response?.data?.message || "login failed");
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row bg-[#FAF7F2]">
      {/* LEFT PANEL - Luxury Branding */}
      <div className="w-full md:w-1/2 bg-[#111111] text-white p-8 sm:p-12 lg:p-16 flex flex-col justify-between relative overflow-hidden min-h-[320px] md:min-h-screen">
        <div>
          {/* Logo */}
          <h1 className="text-2xl sm:text-3xl font-serif tracking-[0.25em] text-white uppercase font-light">
            LUXE
          </h1>
          <div className="w-12 h-[2px] bg-[#C5A059] mt-6 sm:mt-8"></div>
        </div>

        {/* Content */}
        <div className="my-auto py-10">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif leading-tight font-normal text-white max-w-md">
            Your personal world of luxury awaits.
          </h2>
          <p className="mt-4 sm:mt-6 text-gray-400 text-xs sm:text-sm max-w-sm leading-relaxed font-light">
            Members get early access to new arrivals, exclusive offers, and
            curated lookbooks.
          </p>
        </div>

        {/* Footer info */}
        <p className="text-[11px] text-gray-500 tracking-wide font-light">
          Free to join &nbsp;·&nbsp; Cancel anytime &nbsp;·&nbsp; No spam
        </p>
      </div>

      {/* RIGHT PANEL - Tabbed Auth Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-6 sm:p-12 lg:p-16 bg-[#FAF7F2]">
        <div className="w-full max-w-md">
          {/* Dynamic Heading */}
          <div className="mb-6">
            <h2 className="text-2xl sm:text-3xl font-serif text-gray-900 font-medium">
              {activeTab === "signin" ? "Welcome Back" : "Create Account"}
            </h2>
            <p className="text-xs text-gray-500 mt-1 font-light">
              {activeTab === "signin"
                ? "Sign in to your LUXE account"
                : "Join LUXE for exclusive privileges"}
            </p>
          </div>

          {/* Navigation Tabs */}
          <div className="flex border-b border-gray-200 mb-8 relative">
            <button
              onClick={() => setActiveTab("signin")}
              className={`pb-3 text-xs sm:text-sm font-medium transition-colors duration-200 relative mr-8 ${
                activeTab === "signin"
                  ? "text-gray-900 font-semibold"
                  : "text-gray-400 hover:text-gray-600"
              }`}
            >
              Sign In
              {activeTab === "signin" && (
                <motion.div
                  layoutId="activeTabUnderline"
                  className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#C5A059]"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </button>

            <button
              onClick={() => setActiveTab("signup")}
              className={`pb-3 text-xs sm:text-sm font-medium transition-colors duration-200 relative ${
                activeTab === "signup"
                  ? "text-gray-900 font-semibold"
                  : "text-gray-400 hover:text-gray-600"
              }`}
            >
              Create Account
              {activeTab === "signup" && (
                <motion.div
                  layoutId="activeTabUnderline"
                  className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#C5A059]"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </button>
          </div>

          {/* Animated Form Container */}
          <AnimatePresence mode="wait">
            <motion.form
              key={activeTab}
              initial={{ opacity: 0, x: activeTab === "signup" ? 20 : -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: activeTab === "signup" ? -20 : 20 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              onSubmit={handleSubmit}
              className="space-y-4"
            >
              {/* Extra Field for Registration */}
              {activeTab === "signup" && (
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    required
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-md text-xs sm:text-sm focus:outline-none focus:border-gray-900 transition"
                  />
                </div>
              )}

              {/* Email Address */}
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  required
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-md text-xs sm:text-sm focus:outline-none focus:border-gray-900 transition"
                />
              </div>

              {/* Password */}
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="block text-xs font-medium text-gray-700">
                    Password
                  </label>
                  {activeTab === "signin" && (
                    <a
                      href="#forgot"
                      className="text-[11px] text-[#C5A059] hover:underline font-medium"
                    >
                      Forgot password?
                    </a>
                  )}
                </div>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  required
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-md text-xs sm:text-sm focus:outline-none focus:border-gray-900 transition"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-3.5 bg-[#111111] text-white text-xs uppercase tracking-wider font-semibold rounded-md hover:bg-black active:scale-[0.99] transition duration-200 shadow-sm mt-2"
              >
                {activeTab === "signin" ? "Sign In" : "Create Account"}
              </button>
            </motion.form>
          </AnimatePresence>

          {/* Social Divider */}
          <div className="relative my-6 text-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <span className="relative bg-[#FAF7F2] px-3 text-[11px] text-gray-400 font-light uppercase tracking-wider">
              or
            </span>
          </div>

          {/* Social Logins */}
          <div className="space-y-3">
            <button
              type="button"
              className="w-full py-3 bg-white border border-gray-200 rounded-md text-xs font-medium text-gray-700 flex items-center justify-center gap-2 hover:bg-gray-50 active:scale-[0.99] transition shadow-xs"
            >
              <FcGoogle className="text-base" />
              Continue with Google
            </button>
            <button
              type="button"
              className="w-full py-3 bg-white border border-gray-200 rounded-md text-xs font-medium text-gray-700 flex items-center justify-center gap-2 hover:bg-gray-50 active:scale-[0.99] transition shadow-xs"
            >
              <FaApple className="text-base text-black" />
              Continue with Apple
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
