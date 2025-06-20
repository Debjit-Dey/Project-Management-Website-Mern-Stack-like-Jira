// backend/routes/projectRoutes.js
const express = require("express");
const {
  createProject,
  getProjects,
  getProjectById,
  updateProject,
  deleteProject,
  addTeamMember,
} = require("../controllers/projectController");

const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

router.route("/").post(protect, createProject).get(protect, getProjects);

router
  .route("/:id")
  .get(protect, getProjectById)
  .put(protect, updateProject)
  .delete(protect, deleteProject);

router.route("/:id/team").put(protect, addTeamMember);

module.exports = router;
