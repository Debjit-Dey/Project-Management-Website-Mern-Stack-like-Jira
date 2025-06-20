import React, { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const CreateProject = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/projects", { title, description });
      toast.success("Project created");
      navigate("/projects");
    } catch (error) {
      toast.error("Failed to create project");
    }
  };

  return (
    <div className="p-6 min-h-screen bg-gradient-to-r from-primary to-secondary">
      <div className="p-6 max-w-lg mx-auto bg-blue-3  border-blue-600">
        <h2 className="text-2xl font-bold text-white mb-4 ">Create Project</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Project Title"
            className="w-full border p-2 rounded bg-white"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            placeholder="Description"
            className="w-full border p-2 rounded bg-white"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <button
            type="submit"
            className="bg-red-800 text-white px-4 py-2 rounded-md hover:scale-105 transition mb-6 inline-block font-semibold"
          >
            Create
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateProject;
