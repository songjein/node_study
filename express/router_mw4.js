/*
	router 모듈화도 가능
	대규모 프로젝트에 적합
*/
var express = require('express');

var app = express();

var routerA = express.Router();
var routerB = express.Router();


routerA.get('/index', function(req, res){
	res.send('<h1>Index page</h1>');
});

routerB.get('/index', function(req, res){
	res.send('<h1>Index page</h1>');
});

// router setting
app.use('/a', routerA);
app.use('/b', routerB);

app.listen(8888, function(){
	console.log('server running...');
});
