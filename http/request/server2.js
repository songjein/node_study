const http = require('http');
const url= require('url');

http.createServer((request, response) => {
	if (request.method == 'GET'){
		// url parse하는거 외우기가 너무 힘듬
		const query = url.parse(request.url, true).query;
		response.writeHead(200, {'Content-Type': 'text/html'});
		response.end('<h1>' + JSON.stringify(query) + '</h1>');
	}
	else if(request.method == 'POST') {
				
	}
	
	// request 이벤트가 발생 후, request 객체의 data 이벤트로 데이터가 전달됨
	request.on('data', (data) => {
		console.log('Post data:' , data);	
	});

}).listen(8888, () => {
	console.log('server running...');
});
