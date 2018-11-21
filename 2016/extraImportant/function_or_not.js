//	그렇다면 왜 화살표 함수를 쓰면 안되는 경우가 있는가?
(() => {
	console.log(this);	// 자기 자신
})();
// 얘는 {}만 출력

(function () {
	console.log(this);	// window 객체 혹은 bind()된 객체 
})();
// 얘는 뭔가 많이 출력

// 얘의 경우 this키워드는 문자열 자신을 의미하지만
// 화살표 함수의 경우엔 아님
String.prototype.contain = function(input){
	return this.indexOf(input) >= 0;
};

console.log("안녕하세요".contain("안녕"));


// cheerio에서는 제이쿼리 형태로 쓰는데, 제이쿼리에선 화살표함수를 쓰면 안돼!!
// this가 자기자신을 가르키지 못하게 되기 때문
