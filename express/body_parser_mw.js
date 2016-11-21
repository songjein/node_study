// npm install body-parser
// post parser 미들웨어는 POST 요청 데이터를 추출해주는 미들웨어

// body parser 는 'application/x-www-form-urlencoded' 인코딩 방식만 지원함
// 파일 전송을 위한 'multipart/form-data' 인코딩은 multiparty 미들웨어 사용해야댐
// request 객체에 body 속성 부여됨!

const fs = require('fs');
const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const app = express();

// github page 검색해보기
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: false}));

app.get('/', (req, res) => {
	if (req.cookies.auth){
		res.send('<h1>Login Success</h1>');	
	}
	else{
		res.redirect('/login');	
	}
});

app.get('/login', (req,res) => {
	fs.readFile('login.html', 'utf8', (error, data) => {
		//res.send(data.toString());	
		res.send(data);	
	});
});

app.post('/login', (req, res) => {
	const login = req.body.login;
	const password = req.body.password;

	console.log(login, password);
	console.log(req.body);

	if (login == 'jein' && password == '1234'){
		res.cookie('auth', true);
		res.redirect('/');
	}
	else {
		res.redirect('/login');	
	}
});

app.listen(8888, () => {
	console.log('server running...');
});

