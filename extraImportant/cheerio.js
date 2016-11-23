"use strict"
// npm install cheerio
// https://github.com/cheeriojs/cheerio

const request = require('request');
const cheerio = require('cheerio');

// var로 선언하면 66666으로 나옴
for (let i = 0 ; i < 5; i++){
	request({
		url: `http://www.hanbit.co.kr/store/books/category_list.html?page=${i}&cate_cd=001001&srt=p_pub_date`,
		headers: {
			'User-Agent': 'Mozilla/5.0 (Windows NT 6.3; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.99 Safari/537.36'		
		}
	}, (error, response, body) => {
		if (error) return;
		if (response.statusCode != 200) return;

		console.log(i);	// 순서가 보장 안됨 비동기 처리기 때문에
		console.log(i);	// 순서가 보장 안됨 비동기 처리기 때문에

		// 얘는 화살표 함수 쓰면 안되
		const $ = cheerio.load(body);
		const array = []
		$('.sub_book_list').each(function(){
			const title = $(this).find('.book_tit').text();	
			const writer = $(this).find('.book_writer').text();	

			array.push({
				title: title.trim(),
				writer: writer.split(',').map((item) => item.trim())
			});
		});
		//console.log(array);
	});
}

// 순서를 보장하기 위해 async를 사용
// 순서를 보장하기 위해 async를 사용
// 순서를 보장하기 위해 async를 사용
// 순서를 보장하기 위해 async를 사용
