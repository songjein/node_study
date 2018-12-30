/**
 *	라우터 접근 권한 제어 미들웨어들
 *	- 로그인 여부 외에도 팔로잉 여부, 관리자 여부 등의 미들웨어 만들 예정
 */
exports.isLoggedIn = (req, res, next) => {
	if (req.isAuthenticated()) { // passport는 req 객체에 isAuthenticated 메서드를 추가함
		next();	
	} else {
		res.status(403).send('로그인 필요');	
	}
};

exports.isNotLoggedIn = (req, res, next) => {
	if (!req.isAuthenticated()) {
		next();	
	} else {
		res.redirect('/');	
	}
};
