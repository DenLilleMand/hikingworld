var exports = module.exports;
var fileSystem = require('fs');

const execFile = require('child_process').execFile;

exports.build = (request, response, callback) => {
    execFile('./ci.sh', (error, stdout, stderr) => {
        response.end("herpderp");
        fileSystem.writeFile('ci_log.txt', error + stdout + stderr, (err) => {
            response.end(error + stdout + stderr);
        });
    });
    console.log('herpderp!');
    callback();
};

