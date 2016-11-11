var http = require('http');

http.createServer(function(request, response){
	var cookie = request.headers.cookie;

	response.writeHead(200, {
		'Content-Type' : 'text/html',
		'Set-Cookie': ['name2 = Jein', 'region2 = seongnam']
	});

	//response.end('<h1>' + JSON.stringify(cookie) + '</h1>');
	response.end('<h1>' + cookie + '</h1>');

}).listen(8888, function(){
	console.log('server running...');
});
