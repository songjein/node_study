var express = require('express');
var socketio = require('socket.io');

// 웹 서버 및 소켓 서버 생성
var app = express();
var io = socketio();
var server = require('http').createServer(app);

// 소켓 서버를 웹 서버에 연결
io.attach(server);

/* 여러 처리 */

server.listen(8888);

/*
	추가로
	express-generator 로 프로젝트 생성했을 때는, 
	www 파일로 프로젝트를 실행하는데 어떻게 해야할까?

	// app.js
	var app = express();
	app.io = require('socket.io')();

	// www 파일 
	var server = http.createServer(app);
	app.io.attach(server);

	app.js 에서 module.exports로 app 객체를 www 파일에 전달하므로
	app.js에서 app 객체에 io 속성을 추가하고 여기에 socket.io 관련 내용을 모두 넣는다.

	www 파일에서는 server 변수를 생성하는 코드 아래에 
	app.io.attach(server)를 호출해주면 웹서버와 소켓서버가 연결된다
*/
