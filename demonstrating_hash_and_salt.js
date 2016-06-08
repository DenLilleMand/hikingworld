var crypto = require('crypto');


var password = "denlilleiceman20";

var hashedValue = crypto.createHash('sha256').update(password).digest('base64');

console.log('allways the same hashed value:', hashedValue);



var salt = crypto.randomBytes(32).toString("base64");


var saltAndHash = crypto.createHash('sha256').update(salt + password).digest('base64');
console.log('salt and hash:', saltAndHash);






var anotherSaltAndHash = crypto.createHash('sha256').update(salt + password).digest('base64');

console.log('Another:', anotherSaltAndHash);


