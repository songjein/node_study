## 필요 라이브러리 설치
```
npm i -g sequelize-cli
npm i sequelize mysql2
sequelize init

npm i express cookie-parser express-session morgan connect-flash pug
npm i -g nodemon
npm i -D nodemon (서버 코드에 수정사항 생길 때 자동 재시작 해주는 모듈, 개발용) 

npm i multer

npm i uuid
npm i jsonwebtoken

npm i passport-jwt # https://github.com/themikenicholson/passport-jwt

npm i axios

npm i cors
```

## 환경 변수 설정
```
npm i dotenv
touch .env
```

## TODO
- 토큰 만료시 갱신 코드(?)

## JWT 참고자료
- [passport + jwt](https://www.sitepoint.com/spa-social-login-google-facebook/)
- [passport와 jwt를 같이](https://medium.com/front-end-weekly/learn-using-jwt-with-passport-authentication-9761539c4314)
- [vue + express](http://blog.jeonghwan.net/2018/03/26/vue-authentication.html)
- [passport + jwt](http://webframeworks.kr/tutorials/expressjs/auth_log_in_out/)
- [jwt 로그아웃에 대하여](https://medium.com/devgorilla/how-to-log-out-when-using-jwt-a8c7823e8a6)
- [velopert blog](https://velopert.com/2448)
- [oauth passport with jwt](https://stackoverflow.com/questions/40828955/passport-jwt-google-strategy-disable-session-res-send-after-google-cal)


## 메모
- 먼저 passport에 각 정책을 등록해 놓음(passport.use에 정책명 및 옵션, verify(?) 콜백을 등록) 
- 문서에 보면 use에 전달하는 함수에 verify라는 이름을 붙여 놓음
- 이 콜백은 passport.authenticate 호출시 내부적으로 실행되는 콜백임
- 어쨌든 이 콜백에선 전달 받은 로그인 관련 정보(이메일, 패스워드)를 이용해 디비를 체크하고,  
	제대로 로그인 한 경우/아닌경우 done 함수를 다르게 호출함으로써,  
	autenticate에서 등록했던 콜백이 다르게 동작하고,  
	제대로 로그인 된 경우에만 next()로써 다음middleware으로 넘아갈 수 있게함
- api 서버의 경우 generateUserToken 미들웨어를 따로 작성해서, 로그인이 제대로 된 경우(next())에만 token을 발급해준다
- 다만 social login 의 경우 authenticate시 done을 의미하는 콜백을 따로 전달하지 않는데,  
	내부적으로 구현해놓은 듯, 그래서 해당 done안에선 req에 user를 추가해주는 등의 일을 해줄듯하다
	내생각엔 아마 req.login이란 메서드를 호출함으로서 req에 user가 심어질 것 같은데 확인이 필요하다 (req.login) TODO!
- 큰 흐름을 정리하면 
	```
	각 정책 동작 방식 등록 
	-> 로그인 시 passport.authenticate(정책명, params...) 호출 
	-> 내부적으로 req.user 심어짐 (authenticate에 전달했던 콜백이 불리면서 - 그 안에 login 함수가 있고)
	-> 마지막 미들웨어를 통한(generateUserToken) 토큰 발급(return)!

	--> passport.authenticate('jwt', { session: false }) 를 통해 요청 메시지에 발급된 토큰이 들어있는지 확인 후 서비스 이용 허용
	```
- 대충 이런 흐름임을 알 수 있다(끝!!!)

## 클라이언트와 서버 도메인 불일치 CORS
- Cross-Origin Resource Sharing
- resp header에 Access-Control-Allow-Origin 헤더 추가
- cors() 미들웨어 추가시
	- Access-Controll-Allow-Origin: * 
		- 모든 클라이언트 허용


## API 응답 코드는 항상 정리해두기 (아래는 예시)
- 200 : JSON 데이터입니다
- 401 : 유효하지 않은 토큰
- 410 : 새로운 버전이 나왔습니다.
- 419 : 토큰 만료
- 429 : 1분에 한번만 요청가능
