var express = require('express');

var app = express();

app.get('/index', function(req, res){
	res.send('<h1>Index page</h1>');
});

// 라우팅에 전체 선택자 사용 
// 반드시 가장 마지막에 위치
app.all('*', function(req, res){
	res.status(404).send('<h1>Error - page not found</h1>');
});


app.listen(8888, function(){
	console.log('Server running');
});
