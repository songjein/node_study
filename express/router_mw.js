/*
	페이지 라우팅 기능은 express 모듈에 내장되어 있는 미들웨어의 기능이어서
	자동으로 사용가능 하기 때문에
	미들웨어라는 느낌이 적을 수도
	.get
	.post
	.put
	.delete
	.all				: 이게 좀 특이한데, 모든 요청이 발생했을 때의 이벤트 리스너를 지정
*/

var express = require('express');

var app = express();

app.get('/a', function(req, res){
	res.send('<a href="/b">Go to B</a>');
});

app.get('/b', function(req, res){
	res.send('<a href="/a">Go to A</a>');
});

app.listen(8888, function(){
	console.log('Server running...');
});


