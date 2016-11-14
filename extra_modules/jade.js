// 현재 pug 라는 이름으로 바뀜
var http = require('http');
var jade = require('jade');
var fs = require('fs');

http.createServer(function(req, res){
	fs.readFile('test2.jade', 'utf8', function(error, data){
		// create function that can convert jade to html 
		var fn = jade.compile(data);
		res.writeHead(200, {'Content-Type': 'text/html'});
		res.end(fn({
			name: 'jein'
		}));
	});
}).listen(8888, function(){
	console.log('server running...');
});



