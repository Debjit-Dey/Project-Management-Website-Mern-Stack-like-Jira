import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";
import toast from "react-hot-toast";

const TicketForm = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [assignee, setAssignee] = useState("");
  const [teamMembers, setTeamMembers] = useState([]);

  const fetchProjectTeam = async () => {
    try {
      const res = await api.get(`/projects/${projectId}`);
      setTeamMembers(res.data.teamMembers);
      console.log("Team members:", res.data.teamMembers);
    } catch (error) {
      toast.error("Failed to load project members");
    }
  };

  useEffect(() => {
    fetchProjectTeam();
  }, [projectId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      title,
      description,
      priority,
      project: projectId,
    };

    if (assignee) payload.assignee = assignee;

    try {
      await api.post("/tickets", payload);
      toast.success("Ticket created");
      navigate(`/project/${projectId}`);
    } catch (err) {
      toast.error("Failed to create ticket");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-primary to-secondary px-4 py-8">
      <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-xl">
        <h2 className="text-3xl font-extrabold text-primary text-center mb-6">
          🐞 Create New Ticket
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block mb-1 font-medium text-gray-700">
              Ticket Title
            </label>
            <input
              type="text"
              placeholder="Enter ticket title"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-700">
              Description
            </label>
            <textarea
              placeholder="Describe the issue"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 h-28 resize-none focus:outline-none focus:ring-2 focus:ring-primary"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-700">
              Priority
            </label>
            <select
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
            >
              <option value="Low">🟢 Low</option>
              <option value="Medium">🟠 Medium</option>
              <option value="High">🔴 High</option>
            </select>
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-700">
              Assign to
            </label>
            <select
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
              value={assignee}
              onChange={(e) => setAssignee(e.target.value)}
            >
              <option value="">-- Select Team Member --</option>
              {teamMembers.map((user) => (
                <option key={user._id} value={user._id}>
                  {user.name}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-primary text-white font-semibold py-2 rounded-lg hover:bg-indigo-700 transition duration-300"
          >
            🚀 Create Ticket
          </button>
        </form>
      </div>
    </div>
  );
};

export default TicketForm;
