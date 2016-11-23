const request = require('request');

request({
		url: 'http://www.google.com',
		headers: {
			'User-Agent': 'Mozilla/5.0 (Windows NT 6.3; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.99 Safari/537.36'		
		}
	}, (error, response, body) => {
	// 조기 리턴 (더 깔끔)
	if (error) return;
	if (response.statusCode != 200) return; 
	console.log(body);
});

/*
	https://github.com/request/request#custom-http-headers
	를 이용하면 request를 구체적으로 작성할 수 있어
	첫번째 파라미터로 url만 넣는게 아니라
	{
		url: 'http://www.google.com',
		headers: {
			// 따로 입력하지 않으면 로봇인줄 알고 요청을 거부하는 웹사이트가 있어서
			'User-Agent': 'Mozilla/5.0 (Windows NT 6.3; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.99 Safari/537.36'		
		}
	}
	
	/robots.txt 가 없는 사이트는 마음껏 긁어도 됨
	naver.com/robots.txt는 모든것을 허가하지 않는다고 되어있으 
*/
