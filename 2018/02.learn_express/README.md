## express basic
- app.js: core server
- public: static files can be accessed from outside
- routes: business logic
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


## middleware
- app.use() 사이에 들어가는 함수


## middleware의 next()
- 다음 미들웨어로 넘어갈 수 있게 함
- 기본기능 외에도 전달되는 파라미터에 따라 다른 행동을 함  
	1. router에 관한게 들어 갔을 때 --> (일련의 특수 기능 실행)  
	2. 그 외에 값을 넣었을 때 --> (나머지 미들웨어, 라우터를 건너 뛰고 바로 에러 핸들러로 이동)  
		- 이 부분이 설명이 참 이상함, 다음 예시를 보면 알겠지만 건너뛰는 느낌이 아님  
		---> 아, 일반적으로 에러 핸들러를 가장 아래 위치 시켜 놓고  
				 위에 중간중간에서 발생하는 에러를 받아 처리한다고함  
- 예시로, app.js 에서 router에 대한 app.use 처리가 다 끝난 이후에  
	404 에러 처리에 대한 미들웨어가 위치해 있는데 이부분을 유심히 보기  
		- 이 때 next(createError(404))와 같이 작성하면 바로 다음에 위치한 에러 핸들러에게 에러 객체를 보낼 수 있다  
		- 에러 핸들러 또한 미들웨어지만, 인자 개수가 다른(err, req, res, next)의 파라미터를 가진다 (app.js참고)  
			- err 매개변수로 next()에 넣어준 인자가 전달됨


## app.use(address, router)
- routing 미들웨어를 보면 첫 인자가 주소인데,
- 이렇게 주소를 명시하면 특정 주소에 해당할 경우에만(+메서드까지 일치) 미들웨어가 동작토록 할 수 있다.
- use 외에도 get, post, put, patch, delete 메서드를 사용할 수 있다

## morgan 
- 요청에 대한 정보 콘솔에 기록
- 옵션으로는 개발시에 short 혹은 dev, 배포시에는 common이나 combined
	- cf) winston 모듈 (파일이나 디비에 로그 남김)


## body-parser
- request의 body를 해석해주는 놈, 해석한 이후에**req.body**에 추가해준다
- form data나 ajax 요청 데이터 처리
- express 4.16 버전 이후에 따로 설치할 필요 없이 express에 내장됨 express.json, express.urlencoded
	- 폼 전송이 url-encoded 형식을 사용
	- { extended: false } -> node의 querystring을 이용해 스트링 해석
	- { extended: true  } -> qs 모듈 사용
- 하지만 JSON, URL-encoded 형식의 데이터 외에 Raw, Text 형식의 데이터를 해석하고 싶다면
	기존의 body-parser를 설치해야함
	- Raw : 버퍼 데이터
		```js
		app.use(bodyParser.raw());
		```
	- Text 텍스트 데이터
		```js
		app.use(bodyParser.text());
		```

## cookie-parser
- request msg에 포함되어 있는 쿠키를 해석해 **req.cookies**에 넣어준다 
- 클라이언트 측에서의 쿠키에 대한 임의 수정을 방지하기 위해서
	```js
	app.use(cookieParser('secret code'))
	```
	와 같이 작성하게 되면, 전달된 문자열로 서명된 쿠키를 만들 수 있다


## static
- 정적인 파일들을 제공해주는 미들웨어
- 해당 파일들이 있는 폴더를 지정한다
	```js
	app.use(express.static(path.join(__dirname, 'public'))
	```
	과 같이 작성하게되면, public/stylesheets/style.css는 http://localhost:port/stylesheets/style.css로 접근가능
- 자체적으로 정적 파일 라우터 기능을 수행하므로 최대한 위쪽에 배치해야
	쓸데 없는 미들웨어들이 작업을 하지 않음
	추천) morgan 다음에 배치, but 서비스에 따라 다름


## express-session
- 세션 관리용 미들웨어, **req.session** 생성
- npm i express-session
- 1.5 버전 이전에 cookie-parser와 의존관계 있어서, 항상 뒤에 배치해야 했었음 (지금은 x)
- 옵션들
	- resave: 요청이 왔을 때 세션에 수정사항이 생기지 않아도 세션을 다시 저장할지 여부 (???)
	- saveUnitialized: 세션에 저장할 내역이 없더라도 세션을 저장할지 여부 (???)
	- secret: 비밀키, cookie-parser의 비밀키과 같게 설정해야함 
	- cookie: **세션 쿠키**(세션 관리 위해 클라이언트에게 보내는 쿠키)에 대한 설정  
			- maxAge, domain, path, expires, sameSite, httpOnly(클라에서 쿠키 확인x), secure(false->https아닌 환경 ok)  
				store(세션 정보 디비에 저장)
- req.session.destroy(), 세션 한번에 삭제
- req.sessionID (현재 세션 ID)


## connect-flash
- 그 외에 1회성 메시지 생성을 위한 connect-flash가 있다
