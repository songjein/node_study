process.on('exit', (code) => {
	console.log('bye');
	console.log(code);
});

console.log('running...');

/*
	process.exit()같은 경우 0일 땐 정상 종료를 으미ㅣ하고
	강제 종료 할 때는
	process.exit(273) 처럼 원하는 숫자 넣어주셈
	보통 1일 때 비정상 종료를 의미
*/


