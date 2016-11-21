process.on('exit', (code) => {
	console.log('bye bye');	
});

// 실제로 이래쓰진 않는다 try catch로 처리!
// 실제로는 활용하지 않는 게 좋은 이벤트 uncaughtException
// 예외가 나도 프로그램이 종료되지 않게해
process.on('uncaughtException', (error) => {
	console.log('error!!');
	console.log(error);
});


// 에러 강제 발생
var count = 0;
const test = function () {
	count ++; 
	if (count > 3) return;

	setTimeout(test, 1000);
	error.error.error();
};

setTimeout(test, 1000);
