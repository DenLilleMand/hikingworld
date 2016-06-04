var xss = require('xss');
var security = require('./src/server/util/security');


var description = 1;


var herpderp = xss(description);
console.log(herpderp);
