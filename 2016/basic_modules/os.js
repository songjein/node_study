// 문서 주소 http://nodejs.org/dist/latest-v4.x/docs/api/

var os = require('os');

console.log(os.hostname());
console.log(os.type());
console.log(os.platform());
console.log(os.arch());
console.log(os.release()); // os version
console.log(os.uptime());	// os execute time
console.log(os.loadavg());
console.log(os.totalmem());
console.log(os.freemem());
console.log(os.cpus());
console.log(os.networkInterfaces());
