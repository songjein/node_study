// static 또한 내장 미들웨어, 웹서버에서 손쉽게 파일 제공 가능
const express = require('express');

const app = express();

//app.use(express.static(`${__dirname}/public`));
app.use('/files', express.static(`${__dirname}/public`));

app.use((req, res) => {
	//res.writeHead(200, {'Content-Type': 'text/html'});
	//res.end('<img src="test.jpg" width="100%"/>');
	res.send('<img src="/files/test.jpg" width="100%"/>');
})

app.listen(8888, () => {
	console.log('server running ... ');
});


