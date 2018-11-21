var crypto = require('crypto');

var key = 'asdfjas;adf2#@$@#%^dlk$%^#fjsdlkfjlasdkfjlkasdfjklsafj';
var input = 'songsongsong';

// 암호화
var cipher = crypto.createCipher('aes192', key)
cipher.update(input, 'utf8', 'base64');
var cipheredOutput = cipher.final('base64');

// 암호화 해제
var decipher = crypto.createDecipher('aes192', key);
decipher.update(cipheredOutput, 'base64', 'utf8');
var decipheredOutput = decipher.final('utf8');

// 출력
console.log(input);
console.log(cipheredOutput);
console.log(decipheredOutput);
