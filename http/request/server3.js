var http = require('http');
var fs = require('fs');
var url = require('url');

http.createServer(function(request, response){
	if (request.method == 'GET'){
		fs.readFile('form.html', function(error, data){
			response.writeHead(200, {'Content-Type': 'text/html'});
			response.end(data);
		});
	}
	else if(request.method == 'POST') {
		request.on('data', function(data){
			response.writeHead(200, {'Content-Type': 'text/html'});	
			response.end('<h1>' + data + '</h1>');
		});			
	}
}).listen(8888, function(){
	console.log('server running...');
});
