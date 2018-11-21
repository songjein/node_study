// 해시(암호화된 문자) 생성
var crypto = require('crypto')

var shasum = crypto.createHash('sha256'); // param: algorithm
shasum.update('crypto_hash');
var output = shasum.digest('hex');

console.log('crypto_hash:', output);


