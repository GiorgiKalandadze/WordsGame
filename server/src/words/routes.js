const express = require('express');
const { getWordsList } = require('./words-handler');
const router = express.Router();
const swaggerUi = require('swagger-ui-express');
const YAML = require('js-yaml');
const fs = require('fs');
const path = require('path');
const joiValidator = require('../common/joi-validator');
const Joi = require('joi');

const swaggerDocument = YAML.load(
	fs.readFileSync(path.join(__dirname, './swagger.yaml'), 'utf8')
);

router.use(
	'/swagger-docs/words',
	swaggerUi.serve,
	swaggerUi.setup(swaggerDocument)
);
router.get('/v1/words',
	joiValidator({
		query: Joi.object({
			limit: Joi.number().integer().min(1).max(1000).default(1000),
			skip: Joi.number().integer().min(0).default(0),
		})
	}),
	async (request, response) => {
	await getWordsList(request, response);
});

module.exports = { wordsRoutes: router };
