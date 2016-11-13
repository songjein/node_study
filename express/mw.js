// epxress 모듈은 request 이벤트 리스너를 연결하는데 .use 메서드를 쓰고 있음
// 여러 장점이 있어

var express = require('express');

var app = express();

app.use(function(req, res, next){
	console.log('첫 번째 미들웨어');
	next();
});

app.use(function(req, res, next){
	console.log('두 번째 미들웨어');
	next();
});

app.use(function(req, res, next){
	console.log('세 번째 미들웨어');

	res.writeHead(200, {'Content-Type': 'text/html'});
	res.end('<h1>express Basic</h1>');
});

app.listen(8888, function(){
	console.log('server running...');
});


/*
	****************************************************************************
	.use 메서드의 매개변수에 입력하는 함수를 미들웨어라고 부르는 이유
	요청의 응답을 완료하기 전까지 중간중간에 여러가지 일을 처리할 수 있게 도와줌
	****************************************************************************
*/
