const http = require('http');

http.createServer((request, response) => {
	const cookie = request.headers.cookie;

	response.writeHead(200, {
		'Content-Type' : 'text/html',
		'Set-Cookie': ['name2 = Jein', 'region2 = seongnam']
	});

	//response.end('<h1>' + JSON.stringify(cookie) + '</h1>');
	response.end('<h1>' + cookie + '</h1>');

}).listen(8888, () => {
	console.log('server running...');
});
