var tmp = require('./tmp');

tmp.timer.on('tick', function(code){
	console.log('이벤트 실행');
});
