var url = require('url');
var querystring = require('querystring');

var parsedObject = url.parse('http://www.hanbit.co.kr/store/books/look.php?p_code=12345');
console.log(querystring.parse(parsedObject.query));

// 그런데 그냥 url 모듈 쓰면됨
console.log(url.parse('http://www.hanbit.co.kr/store/books/look.php?p_code=12345', true).query);

