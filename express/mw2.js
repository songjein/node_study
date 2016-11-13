// epxress 모듈은 request 이벤트 리스너를 연결하는데 .use 메서드를 쓰고 있음
// 여러 장점이 있어

var express = require('express');

var app = express();

app.use(function(req, res, next){
	// 이런식으로 데이터 추가 가능
	req.number = 52;
	res.number = 333;
	next();
});

app.use(function(req, res, next){
	res.send('<h1>' + req.number + ' : ' + res.number + '</h1>');
});

app.listen(8888, function(){
	console.log('server running...');
});


/*
	****************************************************************************
	.use 메서드의 매개변수에 입력하는 함수를 미들웨어라고 부르는 이유
	요청의 응답을 완료하기 전까지 중간중간에 여러가지 일을 처리할 수 있게 도와줌
	****************************************************************************

	express 모듈은 다양한 미들웨어를 가지고있음

	router							: 페이지 라우트 수행
	static							: 특정 폴더를 서버의 루트폴더에 올림
	morgan 							: 로그 정보를 출력
	cookie parser				: 쿠키 분해
	body parser					: POST 요청 매개변수 추출
	connec-multiparty		: POST 요청 매개변수 추출
	express-session			: 세션 처리 수행
	csurf								: csrf 보안 수행
	error handler				: 예외 처리 수행
	limit								: POST 요청의 데이터 제한	
	vhost								: 가상 호스트 설정
*/
