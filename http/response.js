require('http').createServer(function(request, response){
	// 응답 헤더 작성
	response.writeHead(200, {'Content-Type': 'text/html'});
	// 응답 본문 작성
	response.end('<h1>Hello Web Server</h1>');

}).listen(8888, function(){
	console.log('Server running');
});
