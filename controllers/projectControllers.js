import Project from "../models/projectModel.js";
import expressAsync from "express-async-handler";

export const getProjects = expressAsync(async (req, res) => {
  try {
    const keyword = req.query.keyword
      ? {
          owner: {
            $regex: req.query.keyword,
            $options: "i",
          },
        }
      : {};
    const projects = await Project.find({ ...keyword }).populate("user");

    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export const getUSAProjects = expressAsync(async (req, res) => {
  try {
    const projects = await Project.find({ approved: true, category: 1 });

    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


export const getUSAProjectsByAdmin = expressAsync(async (req, res) => {
  try {
    const projects = await Project.find({ category: 1 });

    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


export const getCANADAProjects = expressAsync(async (req, res) => {
  try {
    const projects = await Project.find({ approved: true, category: 2 });

    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


export const getCANADAProjectsByAdmin = expressAsync(async (req, res) => {
  try {
    const projects = await Project.find({ category: 2 });

    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export const getUnApprovedProjects = expressAsync(async (req, res) => {
  try {
    const projects = await Project.find({ approved: false });

    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export const getMyProjects = expressAsync(async (req, res) => {
  try {
    const projects = await Project.find({ user: req.params.id });

    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export const createProject = expressAsync(async (req, res) => {
  try {
    const {
      user,
      title,
      owner,
      available,
      price,
      image,
      category,
      description,
    } = req.body;
    const project = await Project.create({
      user,
      title,
      owner,
      available,
      price,
      category,
      image,
      description,
      createdAt: new Date().getTime()
    });
    if (project) {
      res.json(project);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export const updateProject = expressAsync(async (req, res) => {
  try {
    const { title, owner, available, price, image, category, description } =
      req.body;

    const project = await Project.findById(req.params.id);
    if (project) {
      project.title = title;
      project.owner = owner;
      project.available = available;
      project.price = price;
      project.image = image;
      project.category = category;
      project.description = description;
      const updatedProject = project.save();

      res.json(updatedProject);
    } else {
      res.status(404).json({ message: "Project not found" });
    }
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

export const updateProjectApproved = expressAsync(async (req, res) => {
  try {
    const { approved } = req.body;

    const project = await Project.findById(req.params.id);
    if (project) {
      project.approved = approved;
    }

    const updatedProject = project.save();

    res.json(updatedProject);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// @desc    Delete a product
// @route   GET /api/product/:id
// @access  Private/Admin
export const deleteProject = expressAsync(async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);

    if (project) {
      res.json({
        message: "project removed",
      });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
