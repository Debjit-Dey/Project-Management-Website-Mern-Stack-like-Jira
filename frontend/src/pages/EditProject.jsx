import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";
import toast from "react-hot-toast";

const EditProject = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchProject = async () => {
    try {
      const res = await api.get(`/projects/${id}`);
      setTitle(res.data.title);
      setDescription(res.data.description);
    } catch (err) {
      toast.error("Project not found or access denied");
      navigate("/projects");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProject();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/projects/${id}`, { title, description });
      toast.success("Project updated successfully");
      navigate(`/project/${id}`);
    } catch (err) {
      toast.error("You are not authorized to edit this project");
    }
  };

  if (loading)
    return <div className="text-center text-white mt-10">Loading...</div>;

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold text-primary mb-6">✏️ Edit Project</h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Title
          </label>
          <input
            type="text"
            className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-primary"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            rows={4}
            className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-primary"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        <button
          type="submit"
          className="bg-primary text-white font-semibold px-6 py-2 rounded hover:bg-indigo-700 transition"
        >
          💾 Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditProject;
