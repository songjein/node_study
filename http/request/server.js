var http = require('http');
var fs = require('fs');
var url = require('url');

http.createServer(function(request, response){
	var pathname = url.parse(request.url).pathname;		

	if (pathname == '/'){
		fs.readFile('index.html', function(error, data){
			response.writeHead(200, {'Content-Type': 'text/html'});	
			response.end(data);
		});		
	}
	else if (pathname == '/other') {
		fs.readFile('other.html', function(error, data){
			response.writeHead(200, {'Content-Type': 'text/html'});	
			response.end(data);
		});		
	}
}).listen(8888, function(){
	console.log('Server running...');
});

// 참고로 node는 페이지 요청시 대소문자 구분함
