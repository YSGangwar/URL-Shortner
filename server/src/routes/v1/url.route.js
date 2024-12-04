const express = require('express');
const urlController = require('../../controller/url.controller');

const router = express.Router();

// Route for POST: '/shortner'
router.post('/shortner', urlController.shortner);

// Route for GET: '/shortner'
router.get('/:hashedData', urlController.finder);

module.exports = router;
