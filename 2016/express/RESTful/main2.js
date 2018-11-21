"use strict"
const express = require('express');
const bodyParser = require('body-parser');

const users = {};

// 서버 생성
const app = express();

// http://stackoverflow.com/questions/29960764/what-does-extended-mean-in-express-4-0
app.use(bodyParser.urlencoded({extended:false}));

app.get('/user', (req, res) => {
	res.send(users);	
});

// 꼭 x-www-form-urlencoded 로 요청해야댐
app.post('/user', (req, res) => {
	const body = req.body;
	if (!body.id) { return response.send('id를 보내주세요');}
	if (!body.name) { return response.send('name를 보내주세요');}
	if (!body.region) { return response.send('region를 보내주세요');}
	
	const id = body.id;
	const name = body.name;
	const region = body.region;

	users[id] = {
		name: name,
		region: region
	};

	res.send(users[id]);

});

app.get('/user/:id', (req, res) => {
	id = req.params.id;
	res.send(users[id]);
});

app.put('/user/:id', (req, res) => {
	const id = req.params.id;
	if (req.body.name){
		users[id].name = req.body.name;
	}
	if (req.body.region){
		users[id].region= req.body.region;
	}
	res.send(users[id]);
});

app.delete('/user/:id', (req, res) => {
	const id = req.params.id;
	delete users[id]
	res.send("제거되었습니다");
});

app.listen(8888, () => {
	console.log('server runngin...');
});



