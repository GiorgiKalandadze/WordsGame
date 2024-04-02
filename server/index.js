if (!process.env.NODE_ENV) {
	require('dotenv').config();
}
const express = require('express');
const app = express();
const router = require('./src/routes');
const cors = require('cors');
const path = require('path');
const DBManager = require('./src/DBManager');
const {
	RESULT_CODES,
	RESULT_STATUSES,
	ENVIRONMENTS
} = require('./src/constants');

DBManager.connectToMongo().catch((error) => {
	console.error('### Error while connecting to MongoDB client: ');
	console.error(error);
});

if (process.env.NODE_ENV === ENVIRONMENTS.LOCALHOST) {
	app.use(cors({ origin: '*' }));
}

if (process.env.NODE_ENV === ENVIRONMENTS.PRODUCTION) {
	app.use(express.static(path.join(__dirname, 'public')));
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', router);
app.get('/', (req, res) => {
	if (process.env.NODE_ENV === ENVIRONMENTS.PRODUCTION) {
		return res.sendFile(path.join(__dirname, 'public', 'index.html'));
	}

	return res.status(200).json({
		resultCode: RESULT_CODES.SUCCESS,
		resultStatus: RESULT_STATUSES.SUCCESS,
		message: 'Hello from server',
		data: null
	});
});

app.listen(process.env.PORT, () => {
	console.log(`Server is running on port ${process.env.PORT}`);
});
