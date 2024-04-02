const { RESULT_CODES, RESULT_STATUSES } = require('../constants');
const DBManager = require('../DBManager');
const constants = require('../constants');
const {promises: fs} = require('fs');

// TODO: Make it as util function and make more general
function shuffleArray(array) {
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]];
	}
}

async function getWordsList(request, response) {
	let wordsList =
		await getMockWordsList() ||
		(await DBManager.getManyDocuments(
			constants.MONGO.DB_NAME,
			constants.MONGO.WORDS_COLLECTION,
			{}
		));
	shuffleArray(wordsList);
	return response.json({
		resultCode: RESULT_CODES.SUCCESS,
		resultStatus: RESULT_STATUSES.SUCCESS,
		message: 'successfully retrieved words list',
		data: { wordsList }
	});
}

async function getMockWordsList() {
	const fs = require('fs').promises;
	const path = require('path');
	const wordsFilePath = path.join(__dirname, 'mock-words.json');
	const data = await fs.readFile(wordsFilePath, 'utf8');
	return JSON.parse(data);

}
module.exports = { getWordsList };

