var http = require('http');

// 쿠키는 이런식으로 지정
// "Name = Value; Expires = 날짜; Domain = 도메인; Path = 경로; Secure"
http.createServer(function(request, response){
	// 변수를 선언
	var date = new Date();
	date.setDate(date.getDate() + 7);
	
	// 쿠키 설정
	response.writeHead(200, {
		'Content-Type': 'text/html',
		'Set-Cookie': [
			'breakfast = toast; Expires = ' + date.toUTCString(), 
			'dinner = chicken'
		]
	});	

	response.end('<h1>' + request.headers.cookie + '</h1>');

}).listen(8888, function(){
	console.log('server running..');
});
