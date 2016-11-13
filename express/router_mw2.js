var express = require('express');

var app = express();

// 라우팅 매개 변수 설정
app.get('/page/:id', function(req, res){
	var name = req.params.id;

	res.send('<h1>' + name + 'Page</h1>');
});

app.listen(8888, function(){
	console.log('server running...');
});
