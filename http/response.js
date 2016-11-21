require('http').createServer((request, response) => {
	// 응답 헤더 작성
	response.writeHead(200, {'Content-Type': 'text/html'});
	// 응답 본문 작성
	response.write('<h1>Hello Web Server</h1>');
	response.end();

}).listen(8888, () => {
	console.log('Server running');
});
