const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const path = require('path');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
require('dotenv').config(); // .env의 키들을 process.env에 넣어줌

const pageRouter = require('./routes/page');
const authRouter = require('./routes/auth');
const postRouter = require('./routes/post');
const userRouter = require('./routes/user');
const { sequelize } = require('./models');
const passportConfig = require('./passport'); // == ./passport/index.js

const app = express();
sequelize.sync();
passportConfig(passport);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.set('port', process.env.PORT || 3000);

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/img', express.static(path.join(__dirname, 'uploads')));
app.use(express.json());
app.use(express.urlencoded({ extended: false} ));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
	resave: false,
	saveUninitialized: false,
	secret: process.env.COOKIE_SECRET,
	cookie: {
		httpOnly: true,
		secure: false,
	}
})); // req.session 생성
app.use(flash());
app.use(passport.initialize()); // req에 passport 설정 삽입
app.use(passport.session()); // req.session에 passport 정보 저장 (express-session보다 뒤에 위치)
							// passport.deserializeUser method 호출해줌
							// 이후에 req.user 이용 가능

app.use('/', pageRouter);
app.use('/auth', authRouter);
app.use('/post', postRouter);
app.use('/user', userRouter);

// router 이후에는 에러 핸들링
app.use((req, res, next) => {
	const err = new Error('Not Found');
	err.status = 404;
	next(err);
});

app.use((err, req, res) => {
	res.locals.message = err.message; // template 변수에 대입 이렇게도 가능
	// req.app 을 통해서 app 객체 가져오고
	// .get 을 통해서 .set을 통해 설정했던 값을 가져올 수있다
	res.locals.error = req.app.get('env') === 'development' ? err: {}; 
	res.status(err.status || 500);
	res.render('error');
});

app.listen(app.get('port'), () => {
	console.log(app.get('port'), '번 포트에서 대기중');
});

