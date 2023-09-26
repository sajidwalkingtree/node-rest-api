// routes/items.js
const express = require('express');
const router = express.Router();
const projectController = require('../controllers/project');


router.route('/')
    // Create a project
    .post(projectController.createProject)
    // Update a project
    .get(projectController.getAllProjects);

router.route('/:id')
    // Read one project by ID    
    .get(projectController.getProjectById)
    // Update a project by ID
    .put(projectController.updateProjectById)
    // Delete a project by ID
    .delete(projectController.deleteProjectById);

module.exports = router;
