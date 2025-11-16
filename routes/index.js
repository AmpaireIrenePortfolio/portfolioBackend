const express = require('express');
const router = express.Router();

// Import other route files
const contactRoutes = require('./contactRoutes');
const projectRoutes = require('./projectRoutes');

// Define API paths
router.use('/contact', contactRoutes);
router.use('/projects', projectRoutes);

module.exports = router;