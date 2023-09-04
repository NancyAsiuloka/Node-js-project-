const express = require('express')
const router = express.Router();
const path = require('path')

router.get('^/$|/index(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'index.html'));
})
router.get('/new-page(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'new-page.html'));
})

// Redirect to the new-page.html page
router.get('/old-page(.html)?', (req, res) => {
    res.redirect(301, '/new-page.html');
});

module.exports = router;