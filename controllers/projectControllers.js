import Project from "../models/projectModel.js";
import expressAsync from "express-async-handler";

export const getProjects = expressAsync(async (req, res) => {
  try {
    const projects = await Project.find();

    res.status(200).json(projects);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

export const createProject = expressAsync(async (req, res) => {
  try {
    const {user, title, price, image, category, description } = req.body;

    const project = await Project.create({
      user,
      title,
      price,
      category,
      image,
      description,
    });
    if (project) {
      res.json(project);
    }
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});
