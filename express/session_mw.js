/*
	cookie가 클라이언트에 정보를 저장하는 기술이라면
	session은 서버에 정보를 저장하는 기술

	세션은 클라이언트에게 '세션 식별자 쿠키'를 부여
	부여한 세션 식별자 쿠키에 대응되는 서버의 저장소에 데이터 저장

	npm install express-session

	express-session 미들웨어를 사용하면 request 객체에 session 속성을 부여한다.

	브라우저를 확인하면
	cookies 목록에
	connect.sid 가 보인다.
	이게 바로 '세션 식별자 쿠키'

	express 모듈은 기본적으로 웹 브라우저를 끄면 세션 지움
	
	쿠키가 사라지는 시간 바꾸고 싶으면 session 메서드에 옵션 추가
	cookie: {maxAge : 60 * 1000}

	session 메서드의 옵션
	name ; 쿠키의 name 속성 지정
	store ; 세션 저장소 지정
	cookie ; 생성할 cookie와 관련된 정보 지정
	secret ; 비밀 ㅣ 지정
	resave ; 세션이 변경되지 않았어도 세션 저장소에 반영(resave)할지 설정
	saveUnitialized ; 초기화 되지 않은 세션을 세션 저장소에 저장할지 설정

	request.session 의 속성
	.regenerate()	; 세션 다시 생성
	.destroy()		; 세션 제거
	.reload()			; 세션 다시 불러와
	.save()				; 세션 저장
*/

var express = require('express');
var session = require('express-session');

var app = express();

app.use(session({
	secret: 'secret key',
	resave: false,
	saveUninitialized: true,
	cookie: {
		maxAge : 60 * 1000	
	}
}));

app.use(function(req, res){
	// session 저장
	req.session.now = (new Date()).toUTCString();
	res.send(req.session);
});

app.listen(8888, function(){
	console.log('server running...');
});

