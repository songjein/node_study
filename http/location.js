var http = require('http');

http.createServer(function(request, response){
	response.writeHead(302, {'Location' : 'http://www.hanbit.co.kr'});
	response.end();

}).listen(8888, function(){
	console.log('Server Running...');
});


/*
	1XX : 처리중 100 Continue
	2XX : 성공 200 OK
	3XX : 리다이렉트 300 Multiple Choice
	4XX : 클라이언트 오류 400 Bad Request
	5XX : 서버 오류 500 Internal Server Error
*/
