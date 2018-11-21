// 서버 생성
var server = require('http').createServer();

// 서버 실행
server.listen(8888, function(){
	console.log('server runngin at http://localhost:8888');
});

var test = function(){
	// 서버 종료
	server.close()
};

setTimeout(test, 3000);
