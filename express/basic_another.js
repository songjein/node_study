/*
	이후엔 다음과 같이 http 모듈과 함께 서버 실행할 것임
	socker.io 모듈과 같은 다른 모듈과 함께 사용할 땐 이런식으로 해야함
*/
var http = require('http');
var express = require('express');
var app = express();

http.createServer(app).listen(8888, function(){
	console.log('server running...');
});
