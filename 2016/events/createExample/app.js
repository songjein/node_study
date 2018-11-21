//var tmp = require('./tmp');
var timer = require('./tmp');

//tmp.timer.on('tick', (code) => {
timer.on('tick', (code) => {
	console.log('이벤트 실행');
});
