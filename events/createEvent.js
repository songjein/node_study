/*
	node에서 event를 연결할 수 있는 모든 객체는	EventEmitter 객체의 상속을 받는다.
	ex) process

	EventEmitter 객체는 process 객체 안에 있는 생성자 함수로 생성할 수 있는 객체임.
	원래는 events모듈 안에 있지만, process안에도 넣어뒀다고함.
*/

// EventEmitter 객체 생성
// var custom = new process.EventEmitter();
const EventEmitter = require('events');
const custom = new EventEmitter();

// 이벤트 연결
custom.on('tick', (code) => {
	console.log('이벤트 발생');
	console.log(code);
});

// 이벤트 강제 발생
custom.emit('tick');
