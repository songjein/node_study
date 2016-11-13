var express = require('express');

var app = express();

app.use(function(req, res, next){
	var name = req.query.name;
	var region = req.query.region;

	res.send('<h1>' + name + '-' + region + '</h1>');
});


app.listen(8888, function(){
	console.log('server running...');
});
