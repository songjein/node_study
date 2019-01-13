# Node 정리
- 2016년에 공부한 내용은 2016 폴더 아래로 다 옮겨버림!
- 2018년 버전으로 새롭게 정리 (Node.js 교과서 참고, 이해 후 재구성)


## ES2015(ES6)
- 이해하기 힘들었던 module, promise, async/await  정리한다

### Module
- [참고자료](https://enyobook.wordpress.com/2016/08/17/export-default%EC%97%90-%EB%8C%80%ED%95%B4/)

### Promise
- ES6 부터 자바스크립트와 노드의 **API**들이 '콜백 대신에!! **프로미스 기반으로 재구성**됨'(책에서 이래 설명)
	- 쉽게 말해서, **'콜백을 받는 API는 promise라고 불리는 놈 기반으로 구현해라'** 라는 말
- 프로미스를 씀으로써, **callback이 중첩되어 코드가 복잡해지는 것을 막을 수** 있기 때문이다 

프로미스 객체는 다음과 같이 구현
```js
// 요런 API가 구현되어 있다고 할 때,
const condition = true
promise = new Promise((resolve, reject) => {
	if (condition) {
		resolve('success');	
	} else {
		reject('fail');	
	}
});

/* 
 *	유저는 아래와 같이 해당 프로미스를 사용한다.
 *	1. then 에는 API가 성공적으로 호출 되었을 경우 불릴 콜백(API 구현시 resolve param)이고, 
 *		API에서 작업 성공시 msg라는 파라미터를 넘기는 콜백을 호출해 준다면,
 *		유저는 같은 모양의 콜백을 다음과 같이 전달해 준다.
 *	2. catch는API가 에러상황에 부딪혔을 때 불릴 콜백이다(구현시 reject param)
 **/
promise
	.then((msg) => {
		console.log(msg);	
	})
	.catch((error) => {
		console.error(error);	
	});
```
- 대충 요런식으로 쓰게 된다.
	1. 먼저 **promise 객체를 구현**해야 한다
		- resolve는 API가 정상적으로 실행되었을 때 호출되는 콜백이라고 생각하면 된다.
		- reject는 error가 발생했을 때 실행시키고 싶은 콜백을 의미한다.
	2. promise **사용은 위 코드 주석**에 설명함


- 참고로, **then이 끝나고 나서 또다른 then을 체이닝**할 수 있다. then().then()... 과 같이
	1. ES6는 이전 **then의 return 값을 다음 then의 매개변수로** 넘긴다
	2. then 안에서 promise를 리턴하는 경우, 해당 promise가 수행 된 이후에, 다음 then이 호출된다

	즉, 아래처럼 return이 동작을하고, **만약 return에 promise가 있었다면 promise의 리턴값이 전달**
	```js
	promise
		.then((msg) => {
			console.log(msg);
			return 'hello';
		})
		.then((msg) => {
			console.log(msg, 'me too'); // 'hello me too'
		})
		.catch((err) => {
			console.error(err);	
		});;
	```

- 위의 내용을 종합하는 실제 예시(promise를 안 썼을 경우와 썼을 경우)

	- 쓰지 않았을 경우
	```js
	function findAndSaveUser(Users) {
		// 1 level
		Users.findOne({}, (err, user) => {
			if (err) {
				return console.error(err);
			}
			user.name = 'zero'
			// 2 level
			user.save((err) => {
				if (err) {
					return console.err(err);
				}
				// 3 level (callback hell)
				User.findOne({ gender: 'm' }, (err, user) => {
					// ...
				});
			});
		});

	```

	- 썼을 경우
		- 물론 findOne 메서드가 **프로미스 객체로 구현**이 되었을 때 가능한 소리임
	```js
	function findAndSaveUser(Users) {
		Users.findOne({}) // 원래 2번째 파라미터로 전달했던 콜백을, then에 명시
			.then((user) => {
				user.name = 'zero';
				return user.save();
			})
			.then((uesr) => { // 이부분은 원래 save의 콜백이었음
				return Users.findOne({ gender: 'm' });
			})
			.then((user) => {
				// ...
			})
			.catch((err) => {
				console.log(err);
			});
	}
	```
	- 재차 강조하면, 원래는 findOne의 callback params였던 것을, 이젠 then에 명시하고 있으며, 그 안에서 성공시 resolve를 호출해 줄거고, 그렇게 되면 then에 전달한 callback이 실행된다.

- 그러면, Promise에 추가적인 매개변수는 어떻게 전달해? [참고자료](https://stackoverflow.com/questions/35318442/how-to-pass-parameter-to-a-promise-function)
	- function으로 wrapping 한다
	```js
	const someFunction = (username, password) => {
	  return new Promise((resolve, reject) => {
	    /*stuff using username, password*/

	    if ( /* everything turned out fine */ ) {
	      resolve("Stuff worked!");
	    } else {
	      reject(Error("It broke"));
	    }
	  });
	};
	
	// use
	someModule.someFunction(username, password).then(uid => {
	  /* stuff */
	});
	```

## async, await
- 요건 그냥 promise로 구현된 객체를 호출할 때 호출문이 포함된 함수에 async를 붙여주고
  호출문 앞에 await을 붙여줘서, 굳이 then 이 없어도 흐름을 쉽게 관리할 수 있게 해준다
  ```js
  async () => {
  	const result = await User.findOne({...}); // then에서 result를 받을 필요가 없다.
  }
  ```
  - 이젠, promise가 resolve 될 때까지 기다린다
  	- 대신 에러를 처리하기 위해선 try {} catch (error) {} 로 감싸주어야한다.
  - resolve 되는 것이 리턴 되는 것인지, 직접 리턴하는 것이 리턴되는 것인지는 확인해볼 필요가 있다.
  	- promise에서 그친다면 resolve에 전달된 파라미터가 리턴되어 저장되고
	- promise호출 뒤에 .then()을 체이닝 해서 resolve값을 처리했다면, then() 안의 리턴 값이 저장된다
	```js
	const condition = true;
	promise = new Promise((resolve, reject) => {
		if (condition) {
			resolve('success');	
		} else {
			reject('fail');	
		}
	});

	(async() => { 
		const onlyPromise = await promise;
		console.log('onlyPromise:' , onlyPromise);
		
		const promiseAndThen = await promise
		.then((msg) => {
			return 'hello';
		})
		.then((msg) => {
			return msg + ' me too';
		})
		.catch((err) => {
			console.error(err);	
		});
		console.log(promiseAndThen);
	})()
	```
## 비구조화 할당
- 객체 내에 있는 key:value pair를 변수로 꺼내어 쉽게 할당한다. 익숙해지면 매우 유용하다. 모듈을 임포트 하는 경우가 많기 때문에..
  ```js
  const { name, age } = require('person'); // module.exports = { name: 'jein', age: 10, email: 'jeinsong200@gmail.com' }
  ```
  - 이렇게 하면 name이라는 키를 꺼내어 변수로 만들고 값을 할당한다. 
