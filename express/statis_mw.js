// static 또한 내장 미들웨어, 웹서버에서 손쉽게 파일 제공 가능
var express = require('express');

var app = express();

app.use(express.static(__dirname + "/public"));

app.use(function(req, res){
	res.writeHead(200, {'Content-Type': 'text/html'});
	res.end('<img src="test.jpg" width="100%"/>');
})

app.listen(8888, function(){
	console.log('server running ... ');
});


