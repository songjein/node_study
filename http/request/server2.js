var http = require('http');
var url= require('url');

http.createServer(function(request, response){
	if (request.method == 'GET'){
		var query = url.parse(request.url, true).query;
		response.writeHead(200, {'Content-Type': 'text/html'});
		response.end('<h1>' + JSON.stringify(query) + '</h1>');
	}
	else if(request.method == 'POST') {
				
	}
	
	// request 이벤트가 발생 후, request 객체의 data 이벤트로 데이터가 전달됨
	request.on('data', function(data){
		console.log('Post data:' , data);	
	});
}).listen(8888, function(){
	console.log('server running...');
});
