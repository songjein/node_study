const express = require('express');
const passport = require('passport');
const bcrypt = require('bcrypt');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const { User } = require('../models');

const router = express.Router();

// 회원가입
router.post('/join', isNotLoggedIn, async (req, res, next) => {
	const { email, nick, password } = req.body;
	try {
		const exUser = await User.find({ where: { email } });
		if (exUser) {
			req.flash('joinError', '이미 가입된 이메일입니다');	
			return res.redirect('/join');
		}
		const hash = await bcrypt.hash(password, 12); // 암호화 반복 횟수
		await User.create({
			email,
			nick,
			password: hash,
		});
		return res.redirect('/');
	} catch (error) {
		console.error(error);
		return next(error);
	}
});

// 로컬 로그인
router.post('/login', isNotLoggedIn, (req, res, next) => {
	// 로컬 로그인 전략 수행
	// 중요! - authenticate는 미들웨어임(middleware in middleware)
	// 라우터 미들웨어 내부에 위치한 미들웨어의 경우 (req, res, next)를 인자로 제공하여 호출
	passport.authenticate('local', (authError, user, info) => {
		if (authError) {
			console.log(authError);	
			return next(authError);
		}	
		if (!user) {
			req.flash('loginError', info.message);
			return res.redirect('/');
		}
		// passport에 의해 추가된 login 메서드 
		// - (passport.serializeUser 호출; passport/index.js)
		return req.login(user, (loginError) => {
			if (loginError) {
				console.error(loginError);	
				return next(loginError);
			}	
			return res.redirect('/');
		});
	})(req, res, next);
});

// 로그아웃
router.get('/logout', isLoggedIn, (req, res) => {
	req.logout(); // remove req.user
	req.session.destroy(); // remove content of req.session
	res.redirect('/');
});

// kakao 로그인
// 1.kakao login 창으로 redirect 
router.get('/kakao', passport.authenticate('kakao'));
// 2. 결과를 아래 라우터로 받음 (req.body에 kakao로 부터 받은 정보가 들어있을 것임) 
// -	여기서 카카오 Strategy 수행, local과 다르게 콜백을 따로 제공 하지 않아도, 내부적으로 req.login 호출
// -	-	마지막에 전달하는 미들웨어는 성공시 이동할 곳
router.get('/kakao/callback', passport.authenticate('kakao', { 
	failureRedirect: '/',
}), /* next middleware */(req, res) => {
	res.redirect('/');
});

module.exports = router;
