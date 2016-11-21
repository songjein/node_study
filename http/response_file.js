var fs = require('fs');
var http = require('http');

http.createServer((request, response) => {
	fs.readFile('test.mp4', (error, data) => {
		// image file 제공
		// response.writeHead(200, {'Content-Type': 'image/jpeg'});	
		// mp3
		//response.writeHead(200, {'Content-Type': 'audio/mp3'});	
		response.writeHead(200, {'Content-Type': 'video/mp4'});	
		response.end(data);
	});	
}).listen(8888, () => {
	console.log('Server running...');
});


/*
	특정 형식 파일을 제공할 때 가장 중요한 것은 응답 헤더의 Content-Type이다!
	MIME 형식을 입력한다.

	text/html을 입력하면 웹브라우저가 HTML 페이지를 연다.

	MIME 형식의 예
	text/plain	: 기본 텍스트
	text/html 	: HTML 문서
	text/css		: CSS
	text/xml		: XML
	image/jpeg	: JPG/JPEG 그림 파일
	image/png		: PNG
	video/mpeg	: mpeg 비디오 파일
	audio/mp3		: mp3
*/
