"use strict"
// npm install cheerio
// npm install async 

const request = require('request');
const cheerio = require('cheerio');
const async = require('async');

const array = []
// 비동기 호출 순서를 보장하고 싶을 때는
async.eachSeries([1,2,3,4,5], (i, callback) => {
	request({
		url: `http://www.hanbit.co.kr/store/books/category_list.html?page=${i}&cate_cd=001001&srt=p_pub_date`,
		headers: {
			'User-Agent': 'Mozilla/5.0 (Windows NT 6.3; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.99 Safari/537.36'		
		}
	}, (error, response, body) => {
		if (error) return;
		if (response.statusCode != 200) return;

		console.log(i);	// 순서가 보장 된다 

		// 얘는 화살표 함수 쓰면 안되
		const $ = cheerio.load(body);
		$('.sub_book_list').each(function(){
			const title = $(this).find('.book_tit').text();	
			const writer = $(this).find('.book_writer').text();	

			array.push({
				title: title.trim(),
				writer: writer.split(',').map((item) => item.trim())
			});
		});
		callback(); // 다음으로 진행
	});
}, (error) => {
	// 다끝나면 호출되는 부분
	console.log(array);
});

