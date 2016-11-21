const http = require('http');

http.createServer((request, response) => {
	if (request.headers.cookie){
		// cookie 문자열을 객체로 바꾸기
		const cookie = request.headers.cookie.split(';').map((element) => {
			element = element.split('=');	
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
}).listen(8888, () => {
	console.log('server running...');
});
