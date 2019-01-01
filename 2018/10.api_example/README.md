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
