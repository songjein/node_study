// EventEmitter Obj
// exports.timer = new process.EventEmitter();

const EventEmitter = require('events');
const customEmitter = new EventEmitter();

// 이벤트 강제로 발생
setInterval(() => {
	//exports.timer.emit('tick');
	customEmitter.emit('tick');
}, 1000);


//exports.timer = customEmitter
module.exports = customEmitter

