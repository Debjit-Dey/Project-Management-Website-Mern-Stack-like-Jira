// backend/controllers/projectController.js
const Project = require("../models/Project");

// @desc    Create new project
exports.createProject = async (req, res) => {
  const { title, description, teamMembers } = req.body;

  const project = new Project({
    title,
    description,
    teamMembers,
    createdBy: req.user._id,
  });

  const savedProject = await project.save();
  res.status(201).json(savedProject);
};

// @desc    Get all projects for a user
exports.getProjects = async (req, res) => {
  const projects = await Project.find({
    $or: [{ createdBy: req.user._id }, { teamMembers: req.user._id }],
  }).populate("teamMembers", "name email");

  res.json(projects);
};

// @desc    Get single project by ID
exports.getProjectById = async (req, res) => {
  const project = await Project.findById(req.params.id).populate(
    "teamMembers",
    "name email"
  );

  if (!project) {
    return res.status(404).json({ message: "Project not found" });
  }

  res.json(project);
};

// @desc    Update a project (only by creator)
// @route   PUT /projects/:id
// @access  Private
exports.updateProject = async (req, res) => {
  const { title, description } = req.body;

  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    // Check if the logged-in user is the creator
    if (project.createdBy.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "Not authorized to update this project" });
    }

    // Update fields
    if (title) project.title = title;
    if (description) project.description = description;

    const updated = await project.save();
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error while updating project" });
  }
};

// @desc    Delete a project
exports.deleteProject = async (req, res) => {
  const project = await Project.findById(req.params.id);

  if (!project) {
    return res.status(404).json({ message: "Project not found" });
  }

  if (project.createdBy.toString() !== req.user._id.toString()) {
    return res
      .status(403)
      .json({ message: "Not authorized to delete this project" });
  }

  await project.remove();
  res.json({ message: "Project deleted" });
};

exports.addTeamMember = async (req, res) => {
  // FIX: use the correct key name expected from frontend
  const userId = req.body.userId;

  const project = await Project.findById(req.params.id);

  if (!project) return res.status(404).json({ message: "Project not found" });

  if (!project.teamMembers.includes(userId)) {
    project.teamMembers.push(userId);
    await project.save();
  }

  // repopulate before sending back
  const populatedProject = await Project.findById(req.params.id).populate(
    "teamMembers",
    "name email"
  );

  res.json(populatedProject);
};
