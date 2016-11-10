process.on('exit', function(code){
	console.log('bye');
});

// 프로그램 종료, 이거로 명령하면 종료됨
// process.exit();

// exit 이벤트 강제 호출해도, 프로그램이 종료되는건 아니라는거..
// '이벤트 리스너'만 실행됨!
process.emit('exit');
process.emit('exit');
process.emit('exit');
process.emit('exit');

console.log('executing');
