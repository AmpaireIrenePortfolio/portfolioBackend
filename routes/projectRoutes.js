const express = require('express');
const router = express.Router();
const { getAllProjects, createProject, updateProject  } = require('../controllers/projectController');

// GET /api/projects
router.get('/', getAllProjects);

// (Optional) POST /api/projects
router.post('/', createProject);
// PUT /api/projects/:id - To update a project by its ID
router.put('/:id', updateProject);
module.exports = router;