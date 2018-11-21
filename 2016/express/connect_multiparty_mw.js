/*
	일반적인 입력 양식은 application/x-www-form-urlencoded 인코딩 방식을 사용한다.
	그런데 파일은 일반적인 입력 양식 데이터에 비해 큼
	따라서 웹브라우저는 파일 전송시 multipart/form-data 인코딩 방식을 사용함

	npm instlal connect-multiparty
	이 외에도 busboy, formidable, multiparty, multer 등의 미들웨어 있음
*/

var fs = require('fs');
var express = require('express');
var multipart = require('connect-multiparty');

var app = express();

app.use(multipart({uploadDir: __dirname + '/multipart'}));

app.get('/', function(req, res){
	fs.readFile('file.html', function(error, data){
		res.send(data.toString());	
	});
});

app.post('/', function(req, res){
	//console.log(req.body);  // empty
	//console.log(req.files); // request 객체의 파일 속성!!
	var comment = req.body.comment;
	var imageFile = req.files.image;
	if (imageFile){
		var name = imageFile.name;
		var path = imageFile.path;
		var type = imageFile.type;

		// 이미지 파일 확이
		if (type.indexOf('image') != -1){
			// 이미지 파일의 경우 파일 이름 변경
			// 이렇게 해도 겹치게 되는 경우 UUID, node-uuid 이용
			var outputPath = __dirname + '/multipart/' + Date.now() + '_' + name;
			fs.rename(path, outputPath, function(error){
				res.redirect('/');	
			});
		} else {
			// 이미지 파일 아닌 경우 파일 제거
			fs.unlink(path, function(error){
				res.sendStatus(400);	
			}	)
		}
	} else {
		// 파일이 없을 경우
		res.sendStatus(404);
	}
});

app.listen(8888, function(){
	console.log('server running...');
});


/*
	특정 페이지 라우팅에만 미들웨어 적용하는 법(추천)
	app.post('/', multipart, function(req, res){ });
	function이 실행되기 전에 multipart가 먼저 실행됨
*/
