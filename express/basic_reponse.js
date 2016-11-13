// express 모듈로 서버를 생성하면 request 객체와 response 객체에 다양한 기능이 추가됨

var express = require('express');

var app = express();

// request 이벤트 리스너
app.use(function(req, res){
	var output = [] ;
	for (var i = 0; i < 3 ; i++){
		output.push({
			count: i,
			name: 'name - ' + i
		});	
	}
	
	// 매개변수의 자료형에 따라 적절한 형태로 응답
	res.send(output);

	// 이런식으로 status 코드 추가 가능, ajax 쓸 때 유용
	//res.status(404).send(output);
});


app.listen(8888, function(){
	console.log('server running');
});

/*
	response 객체의 메서드
	.send(data)
	.json(data) ; json 형태로 응답
	.jsonp(data) ; jsonp 형태로 응답
	.redirect([status], path)
*/
