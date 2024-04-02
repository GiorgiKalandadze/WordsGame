const express = require('express');
const router = express.Router();
const { wordsRoutes } = require('./words/routes');

router.use('/', wordsRoutes);

module.exports = router;
