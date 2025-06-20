import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

const Dashboard = () => {
  const { user } = useAuth();
  const [projects, setProjects] = useState([]);

  const fetchProjects = async () => {
    try {
      const res = await api.get("/projects");
      setProjects(res.data);
    } catch (err) {
      toast.error("Failed to load projects");
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <div className="p-6 min-h-screen bg-gradient-to-r from-primary to-secondary">
      {/* Welcome Heading */}
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-white mb-1">
          Welcome, {user?.name || "User"} 👋
        </h2>
        <p className="text-white text-sm">
          Here are your projects. Manage them or create a new one.
        </p>
      </div>

      {/* Create New Project Button */}
      <Link
        to="/create-project"
        className="bg-red-800 text-white px-4 py-2 rounded-md hover:scale-105 transition mb-6 inline-block font-semibold"
      >
        ➕ Create New Project
      </Link>

      {/* Project Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {projects.map((project) => (
          <Link
            to={`/project/${project._id}`}
            key={project._id}
            className="bg-white shadow-md rounded-lg p-5 hover:shadow-lg transition border-l-4 border-primary"
          >
            <h3 className="text-xl font-bold text-primary mb-2">
              ⚒️
              {project.title}
            </h3>
            <p className="text-sm text-gray-600 line-clamp-3">
              🏃‍♀️‍➡️👉{project.description}
            </p>
            <p className="mt-4 text-xs text-gray-500">
              👥 Members: {project.teamMembers?.length || 0}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
