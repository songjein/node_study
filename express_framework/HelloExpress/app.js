// 외부 모듈 추출
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// 사용자 정의 모듈 추출
var index = require('./routes/index');
var users = require('./routes/users');

// 서버 생성
var app = express();

// 서버 설정
// 서버 설정
// 서버 설정
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
/*
	set 메서드 ; express framework의 설정 옵션 지정
	case sensitive routing ; 페이지 라우트 대소문자 구분 지정
	env ; 서버 환경 지정
	trust proxy ; 신뢰할 수 있는 프록시 지정
	views ; 뷰폴더 지정
	view cache ; 뷰 캐시 사용 여부
	등등이 있다는~ 기본설정 사용하면 댐
*/
// 대소문자 구분 하고 싶으면
// app.set('case sensitive routes', true);


// 미들웨어 설정
// 미들웨어 설정
// 미들웨어 설정
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
///////////////////////////////////////////////
// 미들웨어 추가는 이런식으로
// npm install express-session --save
var session = require('express-session');
app.use(session({
	secret: 'secret key',
	resave: false,
	saveUninitialized: true
}));
///////////////////////////////////////////////
app.use(express.static(path.join(__dirname, 'public')));


// 라우터 미들웨어 설정
// 라우터 미들웨어 설정
// 라우터 미들웨어 설정
app.use('/', index);			// 사용자가 GET 방식으로 '/ URL'에 요청했을 경우 index 모듈 제공
app.use('/users', users);		

/*
	express 프레임워크는 자체적으로 
	File System 모듈을 사용해 페이지를 제공하는 render() 제공!
*/
app.get('/product', function(req, res){
	res.render('product', {title: 'product page'});
});

app.get('/product/insert', function(req, res){
	res.render('product/insert', {title: 'insert page'});
});

app.get('/product/edit', function(req, res){
	res.render('product/edit', {title: 'edit page'});
});

// 404 에러 출력
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// 에러 핸들러
// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// 파른 파일에서 require('./app.js') 라 입력하면 서버 객체 app 리턴!
// 파른 파일에서 require('./app.js') 라 입력하면 서버 객체 app 리턴!
// 파른 파일에서 require('./app.js') 라 입력하면 서버 객체 app 리턴!
module.exports = app;

/*
	모듈화 참고 사항
	module.exports 에 등록된 객체 또는 함수는
	require에 의해 추출되었을 때 바로 사용될 수 있다.

	기존의 exports.키 = 객체/함수 형태로 만들면
	require(~).키 형태로 객체/함수등 사용가능 함
*/
