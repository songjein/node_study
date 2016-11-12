var express = require('express');

// 애플리케이션 객체 생성
var app = express(); 

// request 이벤트 리스너
app.use(function(req, res){
	res.writeHead(200, {'Content-Type': 'text/html'});
	res.end('<h1>Hello</h1>');
});

// 서버 실행
app.listen(8888, function(){
	console.log('server running..');
});
