// backend/controllers/ticketController.js
const Ticket = require("../models/Ticket");

// Create Ticket
exports.createTicket = async (req, res) => {
  const { title, description, priority, project, assignee } = req.body;
  const ticket = new Ticket({
    title,
    description,
    priority,
    project,
    assignee,
    createdBy: req.user._id,
  });
  const saved = await ticket.save();
  res.status(201).json(saved);
};

// Get all tickets for a project
exports.getTicketsByProject = async (req, res) => {
  const projectId = req.params.projectId;
  const tickets = await Ticket.find({ project: projectId }).populate(
    "assignee",
    "name email"
  );
  res.json(tickets);
};

// Update ticket
exports.updateTicket = async (req, res) => {
  const ticket = await Ticket.findById(req.params.id);
  if (!ticket) return res.status(404).json({ message: "Ticket not found" });

  Object.assign(ticket, req.body);
  const updated = await ticket.save();
  res.json(updated);
};

// Delete ticket
exports.deleteTicket = async (req, res) => {
  const ticket = await Ticket.findById(req.params.id);
  if (!ticket) return res.status(404).json({ message: "Ticket not found" });

  await ticket.remove();
  res.json({ message: "Ticket deleted" });
};
