process.on('exit', function(code){
	console.log('bye bye');	
});

// 실제로 이래쓰진 않는다 try catch로 처리!
process.on('uncaughtException', function(error){
	console.log('error!!');
});


// 에러 강제 발생
var count = 0;
var test = function () {
	count ++; 
	if (count > 3) return;

	setTimeout(test, 2000);
	error.error.error();
};

setTimeout(test, 2000);
