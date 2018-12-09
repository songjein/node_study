## express basic
- app.js: core server
- public: static files can be accessed from outside
- routes: server's logic
- views: html


## bin/www
- 서버 실행 스크립트
- http 모듈에 express 모듈 연결, 포트 지정
- 맨위에 #!/usr/bin/env node 라고 주석 되어있음 (콘솔 명령어로 만들기, 확장자 없이 실행)


## app.js
- 서버의 핵심 역할 
- 앱에 대한 설정은 app.set으로
- 미들웨어 연결은 app.use로


## routes
- 서버의 실제 비즈니스 로직은 여기서!

## views
- html 부분은 여기에


## middleware의 next()
- 다음 미들웨어로 넘어갈 수 있게 함
- 파라미터에 따라 다른 행동을 함
- 라우터 미들 웨어 밑에 위치시킨다면 404 에러를 처리할 수 있다
	- 이 때 next(createError(404))와 같이 바로 다음에 위치한 에러 핸들러에게 보낼 수 있다
	- 에러 핸들러 또한 미들웨어지만, (err, req, res, next)의 파라미터를 가진다 (app.js참고)
		- err 매개변수로 next()에 넣어준 인자가 전달됨


## morgan 
- 요청에 대한 정보 콘솔에 기록
- 옵션으로는 개발시에 short 혹은 dev, 배포시에는 common이나 combined
	- cf) winston 모듈 (파일이나 디비에 로그 남김)


## body-parser
- request의 body를 해석해주는 놈
- form data나 ajax 요청 데이터 처리
--> express 4.16 버전 이후에 따로 설치할 필요 없이 express에 내장됨 express.json, express.urlencoded
