const express = require('express');

const app = express();

// 라우팅 매개 변수 설정
app.get('/page/:id', (req, res) => {
	const name = req.params.id;

	res.send('<h1>' + name + 'Page</h1>');
});

app.listen(8888, () => {
	console.log('server running...');
});
