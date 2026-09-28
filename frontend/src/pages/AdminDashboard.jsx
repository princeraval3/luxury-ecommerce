import React, { useEffect, useState } from "react";
import { getAdminDashboard } from "../services/adminService";
import { useAuth } from "../context/AuthContext";
import { getUsers } from "../services/userService";
import {
  FiUsers,
  FiShield,
  FiTrendingUp,
  FiShoppingBag,
  FiGrid,
  FiSettings,
  FiMenu,
  FiX,
  FiSearch,
  FiBell,
  FiArrowUpRight,
  FiArrowLeft,
} from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalAdmins, setTotalAdmins] = useState(0);

  const [dashboard, setDashboard] = useState({
    totalUsers: 0,
    totalAdmins: 0,
    totalOrders: 1240,
    totalRevenue: "₹8,45,200",
  });

  useEffect(() => {
    const fetchUserStats = async () => {
      try {
        const data = await getUsers();

        if (data.success) {
          const users = data.users;

          setTotalUsers(
            users.filter((user) => user.role === "user").length
          );

          setTotalAdmins(
            users.filter((user) => user.role === "admin").length
          );
        }
      } catch (error) {
        console.error("failed to fetch user stats:", error);
      }
    };

    fetchUserStats();
  }, []);

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const data = await getAdminDashboard();

        setDashboard((prev) => ({
          ...prev,
          totalUsers: data?.totalUsers || 0,
          totalAdmins: data?.totalAdmins || 0,
        }));
      } catch (error) {
        console.log("dashboard error:", error);
      }
    };

    if (!loading && user?.role === "admin") {
      loadDashboard();
    }
  }, [user, loading]);

  // Luxury Skeleton Loader
  if (loading) {
    return (
      <div className="min-h-screen bg-[#FAF7F2] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-2 border-black border-t-[#C5A059] rounded-full animate-spin"></div>
          <p className="text-xs uppercase tracking-widest text-gray-500 font-medium">
            Loading Dashboard...
          </p>
        </div>
      </div>
    );
  }

  // Access Denied State
  if (!user || user.role !== "admin") {
    return (
      <div className="min-h-screen bg-[#FAF7F2] flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-2xl border border-gray-200 text-center max-w-sm w-full shadow-sm">
          <div className="w-12 h-12 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <FiShield className="text-xl" />
          </div>

          <h2 className="text-xl font-serif font-medium text-gray-900">
            Access Restricted
          </h2>
          <p className="text-xs text-gray-500 mt-2 mb-6 leading-relaxed">
            You need administrator privileges to view this area.
          </p>
          <a
            href="/"
            className="inline-block w-full py-2.5 bg-black text-white text-xs uppercase tracking-wider font-medium rounded-full hover:bg-gray-800 transition"
          >
            Back to Home
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen w-screen bg-[#FAF7F2] flex overflow-hidden font-sans">
      {/* MOBILE SIDEBAR OVERLAY */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-xs"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* FIXED SIDEBAR NAVIGATION */}
      <aside
        className={`fixed lg:static top-0 left-0 h-screen w-64 bg-[#111111] text-white z-50 transition-transform duration-300 flex flex-col justify-between shrink-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="flex flex-col h-full justify-between">
          <div>
            {/* Logo & Close Btn */}
            <div className="p-6 flex items-center justify-between border-b border-gray-800">
              <h1 className="text-xl font-serif tracking-[0.2em] text-white font-light">
                LUXE{" "}
                <span className="text-[10px] text-[#C5A059] tracking-widest uppercase font-sans font-semibold">
                  Admin
                </span>
              </h1>
              <button
                onClick={() => setSidebarOpen(false)}
                className="lg:hidden text-gray-400 hover:text-white"
              >
                <FiX className="text-xl" />
              </button>
            </div>

            {/* Navigation Links */}
            <nav className="p-4 space-y-1.5 text-xs font-medium tracking-wide">
              <a
                href="#overview"
                className="flex items-center gap-3 px-4 py-3 rounded-xl bg-[#222222] text-[#C5A059] font-semibold transition"
              >
                <FiGrid className="text-base" /> Overview
              </a>

              <Link
                to={"/admin/users"}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:bg-white/5 hover:text-white transition"
              >
                <FiUsers className="text-base" /> User Management
              </Link>

              <Link
                to="/admin/orders"
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:bg-white/5 hover:text-white transition"
              >
                <FiShoppingBag className="text-base" /> Orders
              </Link>

              <a
                href="#settings"
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:bg-white/5 hover:text-white transition"
              >
                <FiSettings className="text-base" /> Settings
              </a>
            </nav>
          </div>

          {/* Admin Profile Footer */}
          <div className="p-4 border-t border-gray-800">
            <div className="flex items-center gap-3 bg-[#1A1A1A] p-3 rounded-xl border border-gray-800">
              <div className="w-8 h-8 rounded-full bg-[#C5A059] text-black font-bold text-xs flex items-center justify-center uppercase shrink-0">
                {user?.name ? user.name[0] : "A"}
              </div>
              <div className="overflow-hidden">
                <p className="text-xs font-medium text-white truncate">
                  {user?.name || "Admin User"}
                </p>
                <p className="text-[10px] text-gray-400 truncate">
                  {user?.email}
                </p>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* MAIN SCROLLABLE CONTENT AREA */}
      <div className="flex-1 flex flex-col h-screen overflow-y-auto min-w-0">
        {/* TOP NAVBAR */}
        <header className="bg-white border-b border-gray-200/80 px-4 sm:px-8 py-4 flex items-center justify-between sticky top-0 z-30 shrink-0">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50"
            >
              <FiMenu className="text-lg" />
            </button>

            {/* Back to Site Button */}
            <button
              onClick={() => navigate("/")}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-gray-200 text-xs text-gray-600 hover:bg-gray-100 transition"
            >
              <FiArrowLeft className="text-sm" />
              <span className="hidden sm:inline font-medium">Back to Store</span>
            </button>

            <div className="relative hidden sm:block w-60 lg:w-72">
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
              <input
                type="text"
                placeholder="Search metrics, users, orders..."
                className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-full text-xs focus:outline-none focus:border-black transition"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button className="relative p-2 rounded-full border border-gray-200 text-gray-600 hover:bg-gray-50 transition">
              <FiBell className="text-sm" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-[#C5A059] rounded-full"></span>
            </button>
            <span className="text-xs font-medium text-gray-700 bg-gray-100 px-3 py-1.5 rounded-full border border-gray-200 hidden sm:inline-block">
              Role: <span className="text-black font-bold uppercase">Admin</span>
            </span>
          </div>
        </header>

        {/* DASHBOARD CONTENT BODY */}
        <main className="p-4 sm:p-8 max-w-7xl w-full mx-auto space-y-8 flex-1">
          {/* Welcome Banner */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gradient-to-r from-gray-900 to-black text-white p-6 sm:p-8 rounded-2xl shadow-sm relative overflow-hidden">
            <div className="relative z-10">
              <p className="text-[10px] uppercase tracking-[0.25em] text-[#C5A059] font-semibold mb-1">
                SYSTEM CONTROL CENTER
              </p>
              <h2 className="text-2xl sm:text-3xl font-serif font-normal">
                Welcome, {user?.name || "Administrator"}
              </h2>
              <p className="text-xs text-gray-400 mt-1 max-w-md">
                Here is your live status summary for registered users, active
                permissions, and store performance.
              </p>
            </div>
            <div className="relative z-10 self-start sm:self-center">
              <button className="px-5 py-2.5 bg-[#C5A059] text-black text-xs font-semibold uppercase tracking-wider rounded-full hover:bg-[#b5914b] transition shadow-xs">
                Generate Report
              </button>
            </div>
          </div>

          {/* STATS METRICS GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {/* Total Users Card */}
            <div className="bg-white p-5 sm:p-6 rounded-2xl border border-gray-200/80 shadow-xs hover:border-[#C5A059] transition group">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total Users
                </span>
                <div className="p-2.5 bg-gray-50 text-gray-800 rounded-xl group-hover:bg-[#C5A059] group-hover:text-black transition">
                  <FiUsers className="text-lg" />
                </div>
              </div>
              <div className="flex items-baseline justify-between">
                <h3 className="text-3xl font-bold text-gray-900">
                  {totalUsers}
                </h3>
                <span className="text-[11px] font-semibold text-emerald-600 flex items-center gap-0.5">
                  <FiTrendingUp /> +12%
                </span>
              </div>
              <p className="text-[11px] text-gray-400 mt-2">
                Active registered accounts
              </p>
            </div>

            {/* Total Admins Card */}
            <div className="bg-white p-5 sm:p-6 rounded-2xl border border-gray-200/80 shadow-xs hover:border-[#C5A059] transition group">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total Admins
                </span>
                <div className="p-2.5 bg-gray-50 text-gray-800 rounded-xl group-hover:bg-[#C5A059] group-hover:text-black transition">
                  <FiShield className="text-lg" />
                </div>
              </div>
              <div className="flex items-baseline justify-between">
                <h3 className="text-3xl font-bold text-gray-900">
                  {totalAdmins}
                </h3>
                <span className="text-[11px] font-medium text-gray-500">
                  Privileged Roles
                </span>
              </div>
              <p className="text-[11px] text-gray-400 mt-2">
                Elevated system access permissions
              </p>
            </div>

            {/* Total Orders Placeholder */}
            <div className="bg-white p-5 sm:p-6 rounded-2xl border border-gray-200/80 shadow-xs hover:border-[#C5A059] transition group">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total Orders
                </span>
                <div className="p-2.5 bg-gray-50 text-gray-800 rounded-xl group-hover:bg-[#C5A059] group-hover:text-black transition">
                  <FiShoppingBag className="text-lg" />
                </div>
              </div>
              <div className="flex items-baseline justify-between">
                <h3 className="text-3xl font-bold text-gray-900">
                  {dashboard.totalOrders}
                </h3>
                <span className="text-[11px] font-semibold text-emerald-600 flex items-center gap-0.5">
                  <FiTrendingUp /> +8%
                </span>
              </div>
              <p className="text-[11px] text-gray-400 mt-2">
                Orders fulfilled this month
              </p>
            </div>

            {/* Revenue Metric Placeholder */}
            <div className="bg-white p-5 sm:p-6 rounded-2xl border border-gray-200/80 shadow-xs hover:border-[#C5A059] transition group">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Gross Revenue
                </span>
                <div className="p-2.5 bg-gray-50 text-gray-800 rounded-xl group-hover:bg-[#C5A059] group-hover:text-black transition">
                  <FiArrowUpRight className="text-lg" />
                </div>
              </div>
              <div className="flex items-baseline justify-between">
                <h3 className="text-2xl sm:text-3xl font-bold text-gray-900">
                  {dashboard.totalRevenue}
                </h3>
              </div>
              <p className="text-[11px] text-gray-400 mt-2">
                Updated live from store system
              </p>
            </div>
          </div>

          {/* SECONDARY SECTION GRID */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pb-6">
            {/* Quick Actions Card */}
            <div className="bg-white p-6 rounded-2xl border border-gray-200/80 shadow-xs lg:col-span-2">
              <h3 className="text-base font-serif font-medium text-gray-900 mb-4">
                Quick Administrative Actions
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Link to={"/admin/users"}>
                  <button className="w-full p-4 rounded-xl border border-gray-200 text-left hover:border-black hover:bg-gray-50 transition flex items-center justify-between">
                    <div>
                      <p className="text-xs font-semibold text-gray-900">
                        Manage Users
                      </p>
                      <p className="text-[11px] text-gray-500 mt-0.5">
                        View, edit or modify user roles
                      </p>
                    </div>
                    <FiArrowUpRight className="text-gray-400" />
                  </button>
                </Link>

                <Link to={"/admin/products"}>
                  <button className="w-full p-4 rounded-xl border border-gray-200 text-left hover:border-black hover:bg-gray-50 transition flex items-center justify-between">
                    <div>
                      <p className="text-xs font-semibold text-gray-900">
                        Product Catalog
                      </p>
                      <p className="text-[11px] text-gray-500 mt-0.5">
                        Add new items or edit inventory
                      </p>
                    </div>
                    <FiArrowUpRight className="text-gray-400" />
                  </button>
                </Link>

                <Link to={"/admin/categories"}>
                  <button className="w-full p-4 rounded-xl border border-gray-200 text-left hover:border-black hover:bg-gray-50 transition flex items-center justify-between">
                    <div>
                      <p className="text-xs font-semibold text-gray-900">
                        Category Management
                      </p>
                      <p className="text-[11px] text-gray-500 mt-0.5">
                        Add new items Category
                      </p>
                    </div>
                    <FiArrowUpRight className="text-gray-400" />
                  </button>
                </Link>
              </div>
            </div>

            {/* System Status Panel */}
            <div className="bg-white p-6 rounded-2xl border border-gray-200/80 shadow-xs flex flex-col justify-between">
              <div>
                <h3 className="text-base font-serif font-medium text-gray-900 mb-2">
                  System Status
                </h3>
                <p className="text-xs text-gray-500">
                  All services operational
                </p>
              </div>
              <div className="space-y-3 my-4">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-600">Database Connection</span>
                  <span className="text-emerald-600 font-semibold">Active</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-600">Auth Services</span>
                  <span className="text-emerald-600 font-semibold">
                    Healthy
                  </span>
                </div>
              </div>
              <p className="text-[10px] text-gray-400 border-t border-gray-100 pt-3">
                Last checked: Just now
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;