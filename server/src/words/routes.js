const express = require('express');
const { getWordsList } = require('./words-handler');
const router = express.Router();

router.get('/v1/words', async (request, response) => {
	await getWordsList(request, response);
});

module.exports = { wordsRoutes: router };
