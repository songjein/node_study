// 기본 console 객체
console.log('output: %d', 273);
console.log('%s', 'jein');
obj = {name: 'jein'};
console.log('%j', obj);

// 시간 측정
console.time('alhpa');

var output = 1;
for (var i = 1; i <= 10; i++){
	output *= i;
}
console.log(output);

// 시간 측정 종료
console.timeEnd('alhpa');
