const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Define the POST route for user registration
router.post('/', authController.handleLogin);

module.exports = router;
