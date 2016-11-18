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
var io = socketio.listen(server);

// connection 이벤트 연결 (클라이언트가 웹 소켓 서버에 접속할 때 발생)
io.sockets.on('connection', function(socket){

});

// 현재는 개발하는 모드이므로 디버그모드 활성화
// export DEBUG=socket.io*
// node socket.io.server
// *는 뭔의미일까?

