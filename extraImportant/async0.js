/*
	async 모듈은 코드의 흐름을 관리하거나 파일을 처리할 때 사용한다
	예를 들어 파일 3개를 모두 읽고 한꺼번에 출력하려고하면
	readFile을 중첩해서 코드를 작성해야하는 보기안좋은 코드를 작성해야한다

	async 모듈은 
	forEach, map, filter, reject, reduce, detect, sortBy, some, every, concat 등의 메서드를 사용해서
	파일 처리를 쉽게 구현한다

*/
const fs = require('fs');
const async = require('async');

const files = ['file1.txt', 'file2.txt', 'file3.txt'];

/*
async.forEach(files, function(tiem, index){
	console.log(item);		
});
*/

//async.map(files, fs.stat, function(error ,results){
// 파일의 상태를 배열로 만들어준다
async.map(files, fs.readFile, function(error ,results){
	// 각각의 파일에 readFile 메서드를 실행하고 그 결과를 매개변수 results에 배열로 출력
	console.log(results);	
	console.log(results.toString('utf8'));	
});
