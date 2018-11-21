const onUncaughtException = (error) => {
	console.log('error!!');
	// 이벤트 제거~!
	process.removeListener('uncaughtException', onUncaughtException);
}

// 이벤트 등록~!
process.on('uncaughtException', onUncaughtException);


// 에러 강제 발생
const test = function () {
	setTimeout(test, 2000);
	error.error.error();
};
setTimeout(test, 2000);
