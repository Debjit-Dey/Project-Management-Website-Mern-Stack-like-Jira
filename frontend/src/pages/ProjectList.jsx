import React, { useEffect, useState } from "react";
import api from "../services/api";
import { Link } from "react-router-dom";

const ProjectList = () => {
  const [projects, setProjects] = useState([]);

  const fetchProjects = async () => {
    try {
      const { data } = await api.get("/projects");
      setProjects(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <div className="p-6 bg-gradient-to-r from-primary to-secondary min-h-screen">
      <h2 className="text-2xl font-bold text-white mb-4">My Projects</h2>
      <Link
        to="/create-project"
        className="bg-red-800 text-white px-4 py-2 rounded-md hover:scale-105 transition mb-6 inline-block font-semibold"
      >
        Create New Project
      </Link>
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects.map((project) => (
          <div
            key={project._id}
            className="bg-white shadow-md p-4 rounded-xl border border-gray-200"
          >
            <h3 className="text-xl font-semibold text-secondary">
              {project.title}
            </h3>
            <p className="text-gray-600 text-sm mt-1">{project.description}</p>
            <Link
              to={`/project/${project._id}`}
              className="text-sm text-primary mt-2 inline-block hover:underline"
            >
              View Details →
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectList;
