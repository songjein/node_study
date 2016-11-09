var fs = require('fs');

fs.readFile('textfile.txt', 'utf8', function(error, data){
	// 오류 -> 바로 리턴
	if (error) { return console.log(error); }
	
	// 원하는 처리
	console.log(data);
});

// 이런식으로 들여쓰기 줄이는 방법도 ..
