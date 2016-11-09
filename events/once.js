// 이벤트 한번만 연결하기
process.once('uncaughtException', function(error){
	console.log('error');	
});


var test = function(){
	setTimeout(test, 200);
	error.error.error();
};

setTimeout(test, 200);
