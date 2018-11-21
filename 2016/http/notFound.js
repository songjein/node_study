var http = require('http');

http.createServer(function (request, response){
	response.writeHead(404);
	response.end();

}).listen(8888, function(){
	console.log('server running...');
});
