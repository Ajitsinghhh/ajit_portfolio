const express = require("express");
const router = express.Router();
const Project = require("../models/Project");

// GET /api/projects - Get all projects
router.get("/", async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json(projects);
  } catch (error) {
    console.error("Error fetching projects:", error);
    res.status(500).json({
      error: "Failed to fetch projects",
    });
  }
});

// POST /api/projects - Create a new project
router.post("/", async (req, res) => {
  try {
    const { title, description, imageUrl, tags } = req.body;

    // Validation
    if (!title || !description || !imageUrl) {
      return res.status(400).json({
        error: "Title, description, and image URL are required",
      });
    }

    const newProject = new Project({
      title,
      description,
      imageUrl,
      tags: tags || [],
    });

    await newProject.save();

    res.status(201).json({
      message: "Project created successfully!",
      data: newProject,
    });
  } catch (error) {
    console.error("Error creating project:", error);
    res.status(500).json({
      error: "Failed to create project",
    });
  }
});

// PUT /api/projects/:id - Update a project
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, imageUrl, tags } = req.body;

    const updatedProject = await Project.findByIdAndUpdate(
      id,
      { title, description, imageUrl, tags },
      { new: true, runValidators: true },
    );

    if (!updatedProject) {
      return res.status(404).json({
        error: "Project not found",
      });
    }

    res.json({
      message: "Project updated successfully",
      data: updatedProject,
    });
  } catch (error) {
    console.error("Error updating project:", error);
    res.status(500).json({
      error: "Failed to update project",
    });
  }
});

// DELETE /api/projects/:id - Delete a project
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const deletedProject = await Project.findByIdAndDelete(id);

    if (!deletedProject) {
      return res.status(404).json({
        error: "Project not found",
      });
    }

    res.json({
      message: "Project deleted successfully",
      data: deletedProject,
    });
  } catch (error) {
    console.error("Error deleting project:", error);
    res.status(500).json({
      error: "Failed to delete project",
    });
  }
});

module.exports = router;
