// 모듈 추출
const socketIo = require('socket.io');
const express = require('express');
const http = require('http');

// 객체 선언
const app = express();
const server = http.createServer(app);
const io = socketIo.listen(server);

// 미들웨어 설정
app.use(express.static(`${__dirname}/public`));

// 웹 소켓 설정
io.sockets.on('connection', (socket) => {
	// emit 같은 경우 서버에서 쓰면 클라이언트로 데이터를 전달
	setInterval(() => {
		socket.emit('abcd', {
			message: 'From Server'	
		});
	}, 1000);

	// 클라이언트로 부터 전송된 데이터를 받는 곳
	socket.on('abcd', (data) => {
		console.log(data);	
	});
});

// 서버 실행
server.listen(8888, () => {
	console.log('server running...');
});
