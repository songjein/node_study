const express = require('express');

const app = express();

app.use((req, res, next) => {
	const name = req.query.name;
	const region = req.query.region;

	res.send('<h1>' + name + '-' + region + '</h1>');
});

app.listen(8888, () => {
	console.log('server running...');
});
