import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../services/api";
import toast from "react-hot-toast";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useAuth } from "../context/AuthContext";

const ProjectDetails = () => {
  const { projectId } = useParams();
  const [project, setProject] = useState(null);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");

  const [tickets, setTickets] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [priority, setPriority] = useState("");
  const { user } = useAuth(); // get logged-in user

  const fetchProject = async () => {
    try {
      const res = await api.get(`/projects/${projectId}`);
      setProject(res.data);
    } catch {
      toast.error("Failed to load project");
    }
  };

  const fetchUsers = async () => {
    try {
      const res = await api.get("/users");
      setUsers(res.data);
    } catch {
      toast.error("Failed to load users");
    }
  };

  const fetchTickets = async () => {
    const { data } = await api.get(`/tickets/project/${projectId}`);
    setTickets(data);
    setFiltered(data);
  };

  const addMember = async () => {
    if (!selectedUser) return toast.error("Select a user");
    try {
      await api.put(`/projects/${projectId}/team`, { userId: selectedUser });
      toast.success("User added to project");
      setSelectedUser("");
      fetchProject();
    } catch {
      toast.error("Could not add member");
    }
  };

  useEffect(() => {
    fetchProject();
    fetchUsers();
    fetchTickets();
  }, [projectId]);

  useEffect(() => {
    let filteredData = [...tickets];
    if (priority) {
      filteredData = filteredData.filter((t) => t.priority === priority);
    }
    if (search) {
      filteredData = filteredData.filter((t) =>
        t.title.toLowerCase().includes(search.toLowerCase())
      );
    }
    setFiltered(filteredData);
  }, [search, priority, tickets]);

  const onDragEnd = async (result) => {
    const { destination, source, draggableId } = result;
    if (!destination || destination.droppableId === source.droppableId) return;

    const updated = tickets.map((ticket) =>
      ticket._id === draggableId
        ? { ...ticket, status: destination.droppableId }
        : ticket
    );
    setTickets(updated);

    await api.put(`/tickets/${draggableId}`, {
      status: destination.droppableId,
    });
  };

  const columns = ["To Do", "In Progress", "Done"];

  return (
    <div className="p-4  bg-gradient-to-r from-primary to-secondary min-h-screen min-w-screen pr-12">
      {/* Title & Description */}
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-white mb-1">
          📁 {project?.title}
        </h2>
        <p className="text-gray-400">{project?.description}</p>
      </div>

      {/* Add Member */}
      <div className="flex items-center gap-3 mb-6 ">
        <select
          value={selectedUser}
          onChange={(e) => setSelectedUser(e.target.value)}
          className="border bg-blue-300 border-gray-300 px-4 py-2 rounded-lg w-full max-w-xs focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="">➕ Select user to assign</option>
          {users.map((user) => (
            <option key={user._id} value={user._id}>
              {user.name}
            </option>
          ))}
        </select>
        <button
          onClick={addMember}
          className="bg-red-800  hover:scale-105  text-white font-semibold px-4 py-2 rounded-lg  transition"
        >
          + Add Member
        </button>
      </div>

      {project?.createdBy === user._id && (
        <div className="flex gap-4 mt-4 mb-6">
          <Link
            to={`/projects/${projectId}/edit`}
            className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:scale-105 transition"
          >
            ✏️ Edit Project
          </Link>
          <button
            onClick={async () => {
              if (
                !window.confirm("Are you sure you want to delete this project?")
              )
                return;
              try {
                await api.delete(`/projects/${projectId}`);
                toast.success("Project deleted");
                navigate("/projects");
              } catch {
                toast.error("You are not authorized to delete this project");
              }
            }}
            className="bg-red-600 text-white px-4 py-2 rounded-md hover:scale-105 transition"
          >
            🗑️ Delete Project
          </button>
        </div>
      )}

      {/* Team Members */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-secondary mb-2 ">
          👥 Assigned Team Members
        </h3>
        <ul className="list-disc ml-5 text-sm text-gray-900 text-shadow-blue-100">
          {project?.teamMembers?.length > 0 ? (
            project.teamMembers.map((member) => (
              <li key={member._id}>{member.name}</li>
            ))
          ) : (
            <li className="text-gray-400">No members yet</li>
          )}
        </ul>
      </div>

      {/* New Ticket Button */}
      <Link
        to={`/project/${projectId}/new-ticket`}
        className="bg-red-800 text-white px-4 py-2 rounded-md hover:scale-105 transition mb-6 inline-block font-semibold"
      >
        🎫 + New Ticket
      </Link>

      {/* Filters */}
      <div className="mb-6 flex flex-wrap items-center gap-4">
        <input
          type="text"
          placeholder="🔍 Search tickets..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border px-3 py-2 rounded-md w-full max-w-sm  bg-blue-300 focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="border bg-blue-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="">🎯 All Priorities</option>
          <option value="Low">🟢 Low</option>
          <option value="Medium">🟠 Medium</option>
          <option value="High">🔴 High</option>
        </select>
      </div>

      {/* Kanban Columns */}
      <div className="overflow-x-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:max-w-[700px] xl:max-w-[1000px]">
          <DragDropContext onDragEnd={onDragEnd}>
            {columns.map((status) => (
              <Droppable droppableId={status} key={status}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className="bg-white rounded-xl p-4 w-full min-h-[300px] shadow border-t-4 border-primary"
                  >
                    <h3 className="font-bold text-secondary mb-3">{status}</h3>
                    {filtered
                      .filter((t) => t.status === status)
                      .map((ticket, index) => (
                        <Draggable
                          key={ticket._id}
                          draggableId={ticket._id}
                          index={index}
                        >
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className="bg-gray-50 p-3 rounded-md shadow-sm mb-3 border border-gray-200 hover:shadow-md transition"
                            >
                              <p className="font-semibold text-primary mb-1">
                                {ticket.title}
                              </p>
                              <div className="text-sm text-gray-600 space-y-1">
                                <p>🎯 {ticket.priority}</p>
                                <p>
                                  👤{" "}
                                  {ticket.assignee?.name
                                    ? ticket.assignee.name
                                    : "Unassigned"}
                                </p>
                              </div>
                            </div>
                          )}
                        </Draggable>
                      ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            ))}
          </DragDropContext>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;
