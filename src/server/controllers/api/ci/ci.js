var exports = module.exports;
var fileSystem = require('fs');

const execFile = require('child_process').execFile;

exports.build = (request, response, callback) => {
    execFile('./ci.sh', (error, stdout, stderr) => {
        response.end("herpderp");
    });
    console.log('herpderp!');
    callback();
};

