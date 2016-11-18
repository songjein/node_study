var http = require('http');
var fs = require('fs');
var socketio = require('socket.io');

// 웹 서버 생성
var server = http.createServer(function(req, res){
	fs.readFile('socket.html', function(error, data){
		res.writeHead(200, {'Content-Type' : 'text/html'});	
		res.end(data);
	});
}).listen(8888, function(){
	console.log('server running');
});


// 소켓 서버 생성 및 실행
// 웹 소켓 서버 포트 번호 입력 가능하지만, 일반적으로 웹 서버와 함께 사용하므로..
var io = socketio.listen(server);

// connection 이벤트 연결 (클라이언트가 웹 소켓 서버에 접속할 때 발생)
io.sockets.on('connection', function(socket){
	// abc event
	socket.on('abc', function(data){
		console.log('Client Send : ' , data);	
		// 클라이언트에 cba 이벤트 발생시키기
		socket.emit('abcde', data);
	});
});

// 현재는 개발하는 모드이므로 디버그모드 활성화
// export DEBUG=socket.io*
// node socket.io.server
// *는 뭔의미일까?

