const bcrypt = require('bcrypt');
const express = require('express');
const passport = require('passport');

const { generateUserToken } = require('./middlewares');
const { User } = require('../models');

const router = express.Router();


// 회원가입
router.post('/join', async (req, res, next) => {
	const { email, nick, password } = req.body;
	try {
		const exUser = await User.find({ where: { email } });
		if (exUser) {
			return res.status(500).json({
				code: 500,
				message: '이미 가입된 이메일',
			});
		}
		const hash = await bcrypt.hash(password, 12); // 암호화 반복 횟수
		await User.create({
			email,
			nick,
			password: hash,
		});
		return res.status(200).json({
			code: 200,
			message: '가입 완료',
		});
	} catch (error) {
		console.error(error);
		return next(error);
	}
});


// local 로그인
router.post('/login', (req, res, next) => {
	passport.authenticate('local', (authError, user, info) => {
		if (authError) {
			console.log(authError);	
			return next(authError);
		}	
		if (!user) {
			return res.status(500).json({
				code: 500,
				message: info.message, 
			});
		}
		// {session:false} -> now passport do not try to serialize anything
		// google: passportjs-custom-callback-and-set-session-to-false
		return req.login(user, { session: false }, (loginError) => {
			if (loginError) {
				console.error(loginError);	
				return next(loginError);
			}	
			next(); // 로그인이 제대로 되었을 경우에만 next로 넘어가게!
		});
	})(req, res, next);
}, generateUserToken);


// kakao 로그인
router.get('/kakao', 
	passport.authenticate('kakao', {
		session: false,
	}));
router.get('/kakao/callback', 
	passport.authenticate('kakao', { 
		failureRedirect: '/',
		session: false,
	}), 
	generateUserToken);

// TODO: google, facebook

// TEST
router.get('/secure_test',
	passport.authenticate('jwt', { session: false }),
	(req, res) => {
		const { id, email, nick, provider } = req.user;
		res.json({
			code: 200,
			message: 'secure test passed',
			user: JSON.stringify({ id, email, nick, provider }),
		});	
	});

router.get('/insecure_test',
	(req, res) => {
		res.json({
			code: 200,
			message: 'insecure test passed',
		});	
	});


module.exports = router;
