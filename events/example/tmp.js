// EventEmitter Obj
exports.timer = new process.EventEmitter();

// 이벤트 강제로 발생
setInterval(function(){
	exports.timer.emit('tick');
}, 1000);
