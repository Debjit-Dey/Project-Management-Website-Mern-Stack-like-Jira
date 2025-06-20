import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

const Sidebar = ({ isOpen, setIsOpen }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast.success("Logged out");
    navigate("/login");
    if (setIsOpen) setIsOpen(false); // Close sidebar on logout (mobile)
  };

  return (
    <div
      className={`fixed  top-0 left-0 z-50 w-64 bg-indigo-500 shadow-lg transform transition-transform duration-300
      ${isOpen ? "translate-x-0" : "-translate-x-full"} 
      lg:translate-x-0 lg:static lg:block`}
    >
      {/* Close button on small devices */}
      <div className="lg:hidden flex justify-end p-4">
        <button onClick={() => setIsOpen(false)} className="text-white text-xl">
          ✖
        </button>
      </div>

      {/* Sidebar Content */}
      <div className="h-screen p-6 sticky left-0 top-0 overflow-y-hidden">
        <div>
          {/* Logo */}
          <h1 className="text-3xl font-extrabold text-blue-950 mb-10 tracking-tight text-center">
            🐞 NamasteBugs
          </h1>

          {/* Navigation */}
          <nav className="flex flex-col gap-4">
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                `flex items-center gap-2 px-3 py-2 rounded-lg transition ${
                  isActive
                    ? "bg-violet-500 text-white font-semibold shadow"
                    : "text-gray-900 hover:bg-gray-100"
                }`
              }
              onClick={() => setIsOpen(false)}
            >
              📊 Dashboard
            </NavLink>

            <NavLink
              to="/projects"
              className={({ isActive }) =>
                `flex items-center gap-2 px-3 py-2 rounded-lg transition ${
                  isActive
                    ? "bg-violet-500 text-white font-semibold shadow"
                    : "text-gray-900 hover:bg-gray-100"
                }`
              }
              onClick={() => setIsOpen(false)}
            >
              📁 Projects
            </NavLink>

            <NavLink
              to="/create-project"
              className={({ isActive }) =>
                `flex items-center gap-2 px-3 py-2 rounded-lg transition ${
                  isActive
                    ? "bg-violet-500 text-white font-semibold shadow"
                    : "text-gray-900 hover:bg-gray-100"
                }`
              }
              onClick={() => setIsOpen(false)}
            >
              ➕ New Project
            </NavLink>
          </nav>
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="text-white w-full bg-red-700 hover:scale-110 transition px-2 py-2 rounded-lg font-semibold text-left text-xl mt-10"
        >
          🚪 Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
