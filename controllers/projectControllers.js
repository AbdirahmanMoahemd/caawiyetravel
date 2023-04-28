import Project from "../models/projectModel.js";
import expressAsync from "express-async-handler";
import User from "../models/usersModel.js";

export const getProjects = expressAsync(async (req, res) => {
  try {
    const projects = await Project.find();

    res.status(200).json(projects);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});


export const getUSAProjects = expressAsync(async (req, res) => {
  try {
    const projects = await Project.find({approved: true, category: 1});

    res.status(200).json(projects);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});




export const getCANADAProjects = expressAsync(async (req, res) => {
  try {
    const projects = await Project.find({approved: true, category: 2});

    res.status(200).json(projects);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});


export const getMyProjects = expressAsync(async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      const projects = await Project.find();

      res.status(200).json(projects);
    }
   
  } catch (error) {
    res.status(404).json({ error: error.message });
    throw new Error("Project Not Found");
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


export const updateProject = expressAsync(async (req, res) => {
  try {
    const { title, price, image, category, description } = req.body;



    const project = await Project.findById(req.params.id)
    if (project) {
      project.title = title;
      project.price = price;
      project.image = image;
      project.category = category;
      project.description = description;
      
    }
    
    const updatedProject = project.save();

   
  
      res.json(updatedProject);
    
  } catch (error) {
    res.status(404).json({ error: error.message });
    throw new Error("Product Not Found");
  }
});



export const updateProjectApproved = expressAsync(async (req, res) => {
  try {


    const project = await Project.findById(req.params.id)
    if (project) {
      project.approved = true;
      
    }
    
    const updatedProject = project.save();

   
  
      res.json(updatedProject);
    
  } catch (error) {
    res.status(404).json({ error: error.message });
    throw new Error("Product Not Found");
  }
});



// @desc    Delete a product
// @route   GET /api/product/:id
// @access  Private/Admin
export const deleteProject = expressAsync(async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (project) {
      await project.remove();
      res.json({
        message: "project removed",
      });
    } 
    
  } catch (error) {
    res.status(404).json({ error: error.message });
    throw new Error("project Not Found");
  }

});