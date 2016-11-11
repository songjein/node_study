var http = require('http');
var fs = require('fs');
var ejs = require('ejs');

http.createServer(function(request, response){
	// ejs파일은 반드시 utf8로 인코딩해서 읽어야함
	fs.readFile('test.ejs', 'utf8', function(error,data){
		response.writeHead(200, {'Content-Type': 'text/html'});	
		response.end(ejs.render(data, {name: 'jein'}));
	});

}).listen(8888, function(){
	console.log('server running...');
})
