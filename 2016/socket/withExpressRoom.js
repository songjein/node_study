"use strict"
// 모듈 추출
const socketIo = require('socket.io');
const express = require('express');
const http = require('http');

// 객체 선언
const app = express();
const server = http.createServer(app);
const io = socketIo.listen(server);

// 미들웨어 설정
// room 예제의 경우 public/room.html 로 접속하셈
app.use(express.static(`${__dirname}/public`));

// 웹 소켓 설정
io.sockets.on('connection', (socket) => {
	let roomName = null;
	// console.log(socket) 찍어보면 소켓 객체에 관해 살펴볼수~!!!
	// 여러명이 방 접속했을 때, connected 에 관한게 어떻게 변하는지 관찰해봐
	// handshake에 관한 부분은 부록에서 다룸!!
		
	// 클라이언트를 방에 배정
	socket.on('join', (data) => {
		roomName = data.roomName;
		socket.join(data.roomName);
	});
	
	// 클라이언트에서 데이터가 전달되면 배분
	socket.on('message', (data) => {
		io.sockets.in(roomName).emit('message', {
			message: 'from server'
		});
	});
});

// 서버 실행
server.listen(8888, () => {
	console.log('server running...');
});
