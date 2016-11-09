// module : 기능을 쉽게 사용하고자 메서드와 속성을 미리 정의해 모아논것!
// 별도의 .js 로 관리!

var module = require('./exports_module.js');

console.log('abs(-273) : %d' , module.abs(-273));
console.log('circleArea(3) = %d', module.circleArea(3));

/*
	중요 원칙 하나
	module = require('./module');
	이런 식으로 확장자 입력 안하면
	먼저, 같은 폴더 내부의 module.js파일을 찾아보고 없으면
	module 폴더를 찾고, 폴더 안의 index.js 파일을 추출함
*/

