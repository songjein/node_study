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
	// 세션별로 생성되나바?
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

/*
	소켓 하나는 여러 개의 방에 동시에 존재할 수 있다.
	따라서 join() 메서드를 여러 번 호출하면 여러개의 방에 들어갈 수 있다.
	socket.rooms를 출력해보면 현재 어떤 방에 들어가있는지 알 수 있다.

	아! 그리고 to, in 메서드가 같은 의미를 갖는다고해서 의아했는데

	방 하나에 조인했을 때, soket.rooms를 찍어보면
	두개의 방이 나오는데, 
	하나는 socket.io가 소켓을 생성할 때 자동으로 자신의 id로 방을 만든 것이다.
	독방이라 할 수 있다.

	따라서 private 통신을 할 때도  to(), in() 메서드를 쓴것이다.

*/
