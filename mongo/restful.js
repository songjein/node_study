// 모듈을 추출합니다.
const mongojs = require('mongojs');
const express = require('express');
const bodyParser = require('body-parser');

// 데이터베이스 연결
const db = mongojs('node', ['products']);

// 서버를 생성/실행합니다.
const app = express();
app.listen(8888, () => {
  console.log('Server Running...');
});

// 미들웨어를 추가합니다.
app.use(bodyParser.urlencoded({
  extended: false
}));

// 변수를 선언합니다.
const products = {};

// 라우트합니다.
app.get('/product', (request, response) => {
	db.products.find((error, results) => {
		response.send(results);
	});
});
app.post('/product', (request, response) => {
  // 변수를 선언합니다.
  const body = request.body;

  // 예외를 처리합니다.
  if (!body.name) { return response.send('name을 보내주세요'); }
  if (!body.price) { return response.send('price을 보내주세요'); }

  // 변수를 추출합니다.
  const name = body.name;
  const price = body.price;

  // 데이터를 저장합니다.
	db.products.save({
    name: name,
    price: price
	}, (error, results) => {
		// 응답합니다.
		response.send(error || results); // 코딩방식 주목
	});
});

app.get('/product/:id', (request, response) => {
  // 변수를 선언합니다.
  const id = request.params.id;
	db.products.findOne({
		_id: mongojs.ObjectId(id) 	
	}, (error, result) => {
		// 이런식으로 처리할 수도
		if (error) {
			response.send("에러가 발생하였습니다");
		} else {
			response.send(result);	
		}
	});
});
app.put('/product/:id', (request, response) => {
  // 변수를 선언합니다.
  const id = request.params.id;
	// 데이터를 하나 찾기
	db.products.findOne({
		_id: mongojs.ObjectId(id)	
	}, (error, result) => {
		// 데이터를 수정
		if (request.body.name) { result.name = request.body.name; }
		if (request.body.price) { result.price = request.body.price; }
		
		// 저장
		db.products.save(result, (error, result) => {
			response.send(error || result);	
		});
	});
	/*
		위험 할 수 있음
		여러명이 데이터에 접근할 때,
		findOne으로 하나를 찾아주고, if (request.body.name) 이 근처에서 다른사람이 데이터를 가져가서 수정하면 충돌이 날수!
		충돌을 막기 위해선 update 구문을 써야함!
	*/
});
app.delete('/product/:id', (request, response) => {
  // 변수를 선언합니다.
  const id = request.params.id;

  // 데이터를 제거합니다.
	db.products.remove({
		_id: mongojs.ObjectId(id)	
	}, (error) => {
		// 응답
		response.send('제거되었습니다');
	});

});
