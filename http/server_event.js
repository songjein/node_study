// 모듈 추출
var http = require('http');

// 서버 객체 생성
var server = http.createServer((req, res) => {
	console.log('Request On');
	res.writeHead(200, {'Content-Type': 'text/html'});
	res.end('<h1>Hello World..!</h1>');
}).listen(8888);


/*
	request 이벤트 리스너는 별도로 on 메서드를 통해 지정 할 필요 없이
	createServer의 매개 변수로 입력 가능하다

	// 서버 객체에 이벤트 연결
	server.on('request', (req, res) => {
		// 내용	
	});
*/


// 웹브라우저가 스트림을 열고 커넥션을 할 때
server.on('connection', (code) => {
	console.log('Connection On');
});

server.on('close', (code) => {
	console.log('Close On');
});

//server.listen(8888);
