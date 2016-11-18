var http = require('http');
var fs = require('fs');
var socketio = require('socket.io');

var server = http.createServer(function(req, res){
	fs.readFile('room.html', function(error, data){
		res.writeHead(200, {'Content-Type' : 'text/html'});	
		res.end(data);
	});
}).listen(8888, function(){
	console.log('server running');
});

var io = require('socket.io').listen(server);

// 소켓 서버 이벤트 연결
io.sockets.on('connection', function(socket){
	var roomName = null;

	// join event
	socket.on('join', function(data){
		roomName = data;
		// join ; 클라이언트가 특정한 방에 접속하게 만드는 이벤트
		socket.join(data);
	});

	// message event ; 같은 방에 속한 클라이언트에게 메시지 전달
	socket.on('message', function(data){
		io.sockets.in(roomName).emit('message', 'test');	
	});
});
