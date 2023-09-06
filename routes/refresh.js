const express = require('express');
const router = express.Router();
const refreshTokenController = require('../controllers/refreshTokenController');

// Define the GET route for token refresh
router.get('/', refreshTokenController.handleRefreshToken);

module.exports = router;
