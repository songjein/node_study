// 모듈 추출
var http = require('http');

// 서버 객체 생성
var server = http.createServer(function(request, response){
	console.log('Request On');
	response.writeHead(200, {'Content-Type': 'text/html'});
	response.end('<h1>Hello World..!</h1>');
}).listen(8888);


/*
	request 이벤트 리스너는 별도로 on 메서드를 통해 지정 할 필요 없이
	createServer의 매개 변수로 입력 가능하다

	// 서버 객체에 이벤트 연결
	server.on('request', function(code){
		console.log('Request On');
	});
*/

server.on('connection', function(code){
	console.log('Connection On');
});

server.on('close', function(code){
	console.log('Close On');
});

//server.listen(8888);
