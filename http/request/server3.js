const http = require('http');
const fs = require('fs');
const url = require('url');

http.createServer((request, response) => {
	if (request.method == 'GET'){
		fs.readFile('form.html', (error, data) => {
			response.writeHead(200, {'Content-Type': 'text/html'});
			response.end(data);
		});
	}
	else if(request.method == 'POST') {
		request.on('data', (data) => {
			response.writeHead(200, {'Content-Type': 'text/html'});	
			response.end('<h1>' + data + '</h1>');
		});			
	}
}).listen(8888, () => {
	console.log('server running...');
});
