var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	// render 를 쓰면, express framework를 설치할 때 선택한 템플릿 엔진으로
	// 파일을 읽어 뒤의 객체를 전달함
  res.render('index', { title: 'Express' });
});

module.exports = router;
