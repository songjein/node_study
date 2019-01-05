const KakaoStrategy = require('passport-kakao').Strategy;

const { User } = require('../models');

module.exports = (passport) => {
	passport.use(new KakaoStrategy({
		clientID: process.env.KAKAO_ID,
		callbackURL: '/auth/kakao/callback', 
	}, async (accessToken, refreshToken, profile, done) => {
		// done에 대해서 predefined 되어 있는 듯하고,
		// local에서 직접 정의한 것과 마찬가지로 login등의 메서드를
		// 호출한다던지의 일등을 해줄 것 같다
		try {
			const exUser = await User.find({ where: { snsId: profile.id, provider: 'kakao' } });	
			if (exUser) {
				done(null, exUser);	
			} else {
				console.log('profile', profile);
				const newUser = await User.create({
					nick: profile.displayName,
					snsId: profile.id,
					provider: 'kakao',
				});	
				done(null, newUser);
			}
		} catch (error) {
			console.error(error);	
			done(error);
		}	
	}));
};
