// cookie parser를 사용하면 req, res에 cookies 속성과 cookie()메서드가 부여됨
// npm install cookie-parser로 설치해야됨

var express = require('express');
var cookieParser = require('cookie-parser');

var app = express();

app.use(cookieParser());

app.get('/getCookie', function(req, res){
	res.send(req.cookies);
});

app.get('/setCookie', function(req, res){
	res.cookie('string', 'cookie');
	res.cookie('json', {
		name: 'cookie', 
		property: 'delicious'
	});
	res.redirect('/getCookie');
});

app.listen(8888, function(){
	console.log('server running...');
});


/*
	cookie method 3th argument
	ex: { maxAge: 6000, secure: true } 

	httpOnly		: 클라이언트의 쿠키 접근 권한 지정
	secure			: secure 속성 지정
	expires			: expires 속성 지정
	maxAge			: 상대적인 expires 속성 지정
	path				: path 속성 지정?
	뭐 요런게 있음..
*/
