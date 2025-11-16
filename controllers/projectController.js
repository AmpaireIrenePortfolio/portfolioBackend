const Project = require('../models/projectModel');

// Get all projects for the portfolio
const getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 }); // Get newest projects first
    res.status(200).json(projects);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Could not fetch projects.' });
  }
};

// (Optional) A function to add a project via an API call
const createProject = async (req, res) => {
    try {
        const project = await Project.create(req.body);
        res.status(201).json(project);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Could not create project.' });
    }
}

module.exports = {
  getAllProjects,
  createProject
};