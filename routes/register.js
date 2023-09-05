const express = require('express');
const router = express.Router();
const registerController = require('../controllers/registerController');

// Define the POST route for user registration
router.post('/', registerController.handleNewUser);

module.exports = router;
