const http = require('http');
const fs = require('fs');
const ejs = require('ejs');

http.createServer((request, response) => {
	// ejs파일은 반드시 utf8로 인코딩해서 읽어야함
	fs.readFile('test.ejs', 'utf8', (error, data) => {
		// 인코딩을 하지 않으면 버퍼가 출력됨
		// 매개변수로 넣거나 data.toString('utf8');
		output = ejs.render(data, {name: 'jein'});
		response.writeHead(200, {'Content-Type': 'text/html'});	
		response.end(output);
	});

}).listen(8888, () => {
	console.log('server running...');
})
