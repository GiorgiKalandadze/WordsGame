const express = require('express');
const { getWordsList } = require('./words-handler');
const router = express.Router();
const swaggerUi = require('swagger-ui-express');
const YAML = require('js-yaml');
const fs = require('fs');
const path = require('path');
const swaggerDocument = YAML.load(
	fs.readFileSync(path.join(__dirname, './swagger.yaml'), 'utf8')
);

router.use(
	'/swagger-docs/words',
	swaggerUi.serve,
	swaggerUi.setup(swaggerDocument)
);
router.get('/v1/words', async (request, response) => {
	await getWordsList(request, response);
});

module.exports = { wordsRoutes: router };
