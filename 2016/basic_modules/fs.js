var fs = require('fs');

// 웃긴게 텍스트 파일이 위치한 곳에서 실행 시켜야하네 ㅡㅡ;

// file read 
var text = fs.readFileSync('textfile.txt', 'utf8'); // 인코딩 방식
console.log(text);

fs.readFile('textfile.txt', 'utf8', function(error, data){
	console.log(data);
});

console.log('complete');


var data = 'Hello~ ';

// file write
fs.writeFile('TextFileOtherWrite.txt', data, 'utf8', function(error){
	console.log('Write file async complete');
})

fs.writeFileSync('TextFileOtherWriteSync.txt', data, 'utf8');
console.log('Write fiel sync complete');
