// 모듈 추출
var http = require('http');

// http 모듈에서 가장 중요한 객체는 server 객체
// 웹서버 생성
var server = http.createServer();

// 웹서버 실행
server.listen(8888);
