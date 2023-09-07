const express = require('express');
const router = express.Router();
const logoutController = require('../controllers/logoutController');

// Define the GET route for token refresh
router.get('/', logoutController.handleLogout);

module.exports = router;
