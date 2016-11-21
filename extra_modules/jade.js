// https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Strict_mode
// 현재 pug 라는 이름으로 바뀜
"use strict"
const http = require('http');
const pug = require('pug');
const fs = require('fs');

http.createServer((req, res) => {
	fs.readFile('test2.jade', 'utf8', (error, data) => {
		// create function that can convert jade to html 
		const fn = pug.compile(data);
		res.writeHead(200, {'Content-Type': 'text/html'});
		res.end(fn({
			name: 'jein'
		}));
	});
}).listen(8888, () => {
	console.log('server running...');
});



