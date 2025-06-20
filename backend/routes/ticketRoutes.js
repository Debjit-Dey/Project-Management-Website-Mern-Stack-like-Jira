// backend/routes/ticketRoutes.js
const express = require("express");
const {
  createTicket,
  getTicketsByProject,
  updateTicket,
  deleteTicket,
} = require("../controllers/ticketController");

const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

router.route("/project/:projectId").get(protect, getTicketsByProject);
router.route("/").post(protect, createTicket);
router.route("/:id").put(protect, updateTicket).delete(protect, deleteTicket);

module.exports = router;
