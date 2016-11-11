var http = require('http');

http.createServer(function(request, response){
	if (request.headers.cookie){
		// cookie 문자열을 객체로 바꾸기
		var cookie = request.headers.cookie.split(';').map(function(element){
			var element = element.split('=');	
			return {
				key : element[0],
				value : element[1]
			};
		});	
		response.end('<h1>' + JSON.stringify(cookie) + '</h1>');

	} else {
		response.writeHead(200, {
			'Content-Type': 'text/html',
			'Set-Cookie': ['name = jein', 'region = seongnam']
		});	

		response.end('<h1>쿠키를 생성했습니다</h1>');
	}
}).listen(8888, function(){
	console.log('server running...');
});
