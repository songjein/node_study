const http = require('http'); 
const fs = require('fs');
const url = require('url');

http.createServer((request, response) => {
	// 이걸 보면 url.parse 를 안해도 되는 듯
	console.log(request.url);
	const pathname = url.parse(request.url).pathname;		

	if (pathname == '/'){
		fs.readFile('index.html', (error, data) => {
			response.writeHead(200, {'Content-Type': 'text/html'});	
			response.end(data);
		});		
	}
	else if (pathname == '/other') {
		fs.readFile('other.html', (error, data) => {
			response.writeHead(200, {'Content-Type': 'text/html'});	
			response.end(data);
		});		
	}
	else {
		response.writeHead(404);	
		response.end();
	}
}).listen(8888, () => {
	console.log('Server running...');
});

// 참고로 node는 페이지 요청시 대소문자 구분함

/*
	정리를 하면

	클라이언트 => 서버 : request
	url, method, query, body 등등

	서버 => 클라이언트 : response
	Content-Type, Status Code body, Set Cookie등을 통해

	메시지를 주고받음
*/
