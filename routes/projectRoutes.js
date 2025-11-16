const express = require('express');
const router = express.Router();
const { getAllProjects, createProject } = require('../controllers/projectController');

// GET /api/projects
router.get('/', getAllProjects);

// (Optional) POST /api/projects
router.post('/', createProject);

module.exports = router;