var express = require('express');
var morgan = require('morgan');

var app = express();

//app.use(morgan('combined'));
//app.use(morgan(':method + :date'))
app.use(morgan('short'));
app.use(function(req, res){
	res.send('<h1>express basic</h1>');
});

app.listen(8888, function(){
	console.log('server running');
});

/*
	combined 는 가장 기본적인 로그형식이고
	아래의 토큰을 조합해 원하는 것만 출력 가능 
	:req[header]				: 요청 헤더
	:res[header]				: 응답 헤더
	:http-version				: HTTP 버전을 나타냄
	:response-time			: 응답 시간을 나타냄
	:remote-addr				: 원격 주소를 나타냄
	:date[format]				: 요청 시간을 나타냄
	:method							: 요청 방식을 나타냄
	:url								: 이전 URL을 나타냄
	:referrer						: 이전 URL을 나타냄
	:User-Agent					: 사용자 에이전트를 나타냄
	:status							: 상태 코드를 나타냄
*/


// combined 같은 기본 형식은 common, dev, short, tiny
