/*
	request 객체 메서드
	.params					: 라우팅 매개변수 추출
	.query					: 요청 매개변수 추출
	.headers				: 요청 헤더 추출
	.header()				: 요청 헤더의 속성을 지정 혹은 추출
	.accepts(type)  : 요청 헤더의 Accept 속성 확인
	.is(type)				: 요청 헤더의 Content-Type 속성 확인
*/


var express = require('express');

var app = express();

app.use(function(req, res){
	var agent = req.header('User-Agent');
	
	if (agent.toLowerCase().match(/chrome/)){
		res.send('<h1>Hello Chrome...</h1>');	
	} else {
		res.send('<h1>Hello express..</h1>');			
	}
});

app.listen(8888, function(){
	console.log('server running');
});
