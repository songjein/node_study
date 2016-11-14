var fs = require('fs');
var express = require('express');
var bodyParser = require('body-parser');

// 더미 데이터베이스 구현
var DummyDB = (function(){
	var DummyDB = {};
	var storage = [];
	var count = 1;

	DummyDB.get = function(id){
		if(id){
			// 특정 데이터 리턴!
			id = (typeof id == 'string') ? Number(id) : id;
			for (var i in storage) if (storage[i].id == id){
				return storage[i];
			}

		} else {
			// 모든 데이터 리턴!
			return storage;	
		}
	};

	DummyDB.insert = function(data){
		data.id = count++;	
		storage.push(data);
		return data;
	};

	DummyDB.remove = function(id){
		id = (typeof id == 'string') ? Number(id) : id;	

		for (var i in storage) if (storage[i].id == id){
			storage.splice(i, 1);		
			// 성공
			return true;
		}
		// 실패
		return false;
	};

	return DummyDB;
})();

var app = express();

// http://stackoverflow.com/questions/29960764/what-does-extended-mean-in-express-4-0
app.use(bodyParser.urlencoded({extended:false}));

app.get('/user', function(req, res){
	res.send(DummyDB.get());	
});

app.get('/user/:id', function(req, res){
	res.send(DummyDB.get(req.params.id));	
});

// 꼭 x-www-form-urlencoded 로 요청해야댐
app.post('/user', function(req, res){
	var name = req.body.name;
	var region = req.body.region;

	if (name && region){
		res.send(DummyDB.insert({
			name: name,
			region: region
		}));

	} else {
		throw new Error('error');	
	}
});

app.put('/user/:id', function(req, res){
	var id = req.params.id;
	var name = req.body.name;
	var region = req.body.region;

	var item = DummyDB.get(id);
	// 와 이런 코딩이 가능하네
	item.name = name || item.name; 
	item.region = region || item.region;

	res.send(item);
});

app.delete('/user/:id', function(req, res){
	res.send(DummyDB.remove(req.params.id));
});

app.listen(8888, function(){
	console.log('server runngin...');
});



