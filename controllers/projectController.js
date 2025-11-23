const Project = require('../models/projectModel');

// Helper function to create full URLs for assets
const createFullAssetUrl = (req, assetPath) => {
  if (!assetPath || !assetPath.startsWith('/static')) {
    return assetPath; // Return as-is if it's not a local asset
  }
  const baseUrl = `${req.protocol}://${req.get('host')}`;
  return `${baseUrl}${assetPath}`;
};

// Get all projects for the portfolio
const getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });

    // Map over projects and convert local asset paths to full URLs
    const updatedProjects = projects.map(project => {
      const projectObj = project.toObject(); // Convert Mongoose doc to a plain object
      
      // Update the image URL if it's a local path
      projectObj.image = createFullAssetUrl(req, projectObj.image);
      
      // Update the video URL if it's a local path (good to keep this for future use)
      projectObj.videoUrl = createFullAssetUrl(req, projectObj.videoUrl);

      return projectObj;
    });

    res.status(200).json(updatedProjects);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Could not fetch projects.' });
  }
};

// Create a new project (THIS WAS THE MISSING FUNCTION)
const createProject = async (req, res) => {
  try {
    const project = await Project.create(req.body);
    res.status(201).json(project);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Could not create project.' });
  }
};

// ... (keep the other functions like getAllProjects and createProject)

// UPDATE A PROJECT (THIS IS THE NEW FUNCTION TO ADD)
const updateProject = async (req, res) => {
  try {
    const { id } = req.params; // Get the id from the URL
    const updatedProject = await Project.findByIdAndUpdate(id, req.body, { new: true });

    if (!updatedProject) {
      return res.status(404).json({ message: 'Project not found.' });
    }

    res.status(200).json(updatedProject);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Could not update project.' });
  }
};

module.exports = {
  getAllProjects,
  createProject, // Now it's properly defined and exported
  updateProject
};