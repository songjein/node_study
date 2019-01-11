```
npm init
```

## 필요 라이브러리 설치
```
npm i -g sequelize-cli
npm i sequelize mysql2
sequelize init

npm i express cookie-parser express-session morgan connect-flash pug
npm i -g nodemon
npm i -D nodemon (서버 코드에 수정사항 생길 때 자동 재시작 해주는 모듈, 개발용) 

npm i multer
```

## 환경 변수 설정
```
npm i dotenv
touch .env
```

## DB 이론
- [PRI, UNI, MUL](https://m.blog.naver.com/PostView.nhn?blogId=kshkyc&logNo=220366433383&proxyReferer=https%3A%2F%2Fwww.google.com%2F)

## Sequelize 사용법
- [공홈문서](http://docs.sequelizejs.com/manual/tutorial/migrations.html)
    - [queryInterface](http://docs.sequelizejs.com/class/lib/query-interface.js~QueryInterface.html)
    - [datatype](http://docs.sequelizejs.com/manual/tutorial/models-definition.html)
    - [association](http://docs.sequelizejs.com/class/lib/associations/base.js~Association.html)
    - [association mixin](https://stackoverflow.com/questions/49467654/what-methods-mixins-sequelize-adds-to-the-models-when-an-association-is-made)
- [필수예제!!!](https://github.com/sequelize/express-example/)
- 마이그레이션 및 association을 다룬 곳
    - 해당 내용을 다룬 외국 블로그를 찾음 [링크](https://medium.com/@andrewoons/how-to-define-sequelize-associations-using-migrations-de4333bf75a7)
    - [추가자료](https://codeburst.io/sequelize-migrations-setting-up-associations-985d29b61ee7)
    - [추가자료2](https://www.duringthedrive.com/2017/05/06/models-migrations-sequelize-node/)
    
- [필독-migrations-model은 직접 수정해서 싱크 맞춰야함](https://stackoverflow.com/questions/21105748/sequelize-js-how-to-use-migrations-and-sync)
    - 결론: migration up/down 작성 후, 해당 내용대로 models를 직접 수정해주자. 그런 다음 db:migrate으로 마무리
- [튜토리얼 블로그 1](http://webframeworks.kr/tutorials/expressjs/expressjs_orm_one/)
- [튜토리얼 블로그 2](https://hyunseob.github.io/2016/03/27/usage-of-sequelize-js/)
- [마이그레이션](http://blog.jeonghwan.net/sequelize-migration/)
    - https://github.com/wonism/TIL/tree/master/back-end/nodejs/sequelize-cli-example
    - https://victorydntmd.tistory.com/27
    - https://jongmin92.github.io/2017/04/08/Node/sequelize/
- [마이그레이션 환경에서 paranoid 추가](https://stackoverflow.com/questions/27292521/sequalizejs-adding-paranoid-configuration-to-an-existing-table)


## 기타 메모
- SET NULL :A foreign key with "set null on delete" means that if a record in the parent table is deleted, then the corresponding records in the child table will have the foreign key fields set to null. The records in the child table will not be deleted.

- CASCADE : Delete or update the row from the parent table, and automatically delete or update the matching rows in the child table. ... If an ON UPDATE CASCADE or ON DELETE CASCADE subclause is only defined for one FOREIGN KEY clause, cascading operations fail with an error.2015. 3. 18.

- m:n relation 을 구현할 때 매우 매우 매우 애를 먹었는데, 문서에도 명확이 뭐라 안나와 있고, 블로그들을 다 뒤져봐도 뭔가 모자라는... 
    - 이제 확실히 알 것 같은데, 일단 조인 테이블을 '모델'로 따로 정의를 해야 했음..
    - migration에 createTable하는 것들은 무조건 '모델'에 정의 및 추가를 해야한다. 
    - trough 옵션에 스트링(ex. UserProjects)를 전달하길래 테이블 이름을 직접 명시하는구나 라고 착각 했지만
    - 그게 아니라 model로 정의하고 조인테이블의 모델명을 명시하는 것이었던 것 같다. 
    - [직접 구현한 참고소스](https://github.com/songjein/FeeelDesign)

## 로그인 구현
- sudo apt-get install g++ make 필요했음
```
npm i passport passport-local passport-kakao bcrypt
```
- passport/index.js
	```js
	passport.serializeUser((user, done) => {
		done(null, user.id);	
	});

	passport.deserializeUser((id, done) => {
		User.find({ where: { id } })
			.then(user => done(null, user)) // req.user에 저장 
			.catch(err => done(err));
	});
	```
	- serializeUser: 사용자 정보(id)를 session에 저장
	- deserializeUser: 세션에 저장된 아이디를 통해 사용자 정보 객체를 불러오는 것
	- -> 세션에 정보 저장을 최소화 하기 위해서
- 로그인 과정
	1. 로그인 요청
	2. passport.authenticate 메서드 호출
	3. 로그인 strategy 수행 (local, kakao, facebook, ... Strategies)
	4. 로그인 성공 시 사용자 정보 객체와 함께 req.login 호출
	5. req.login 메서드가 passport.serializeUser 호출
	6. req.session에 사용자 아이디만 저장
	7. 로그인 완료	
- 로그인 이후
	1. 모든 요청에 대해 passport.session() 미들웨어가 passport.deserializeUser 메서드 호출
	2. req.session 에 저장된 아이디로 db에서 사용자 조회
	3. 조회된 사용자 정보 req.user에 저장
	4. 라우터에서 req.user 객체 사용 가능
- req.isAuthenticated
	- passport가 req객체에 isAuthenticated 메섣드를 추가해준다.
	- routes/middlewares.js 에서 활용
