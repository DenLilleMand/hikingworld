var exports = module.exports;
var fileSystem = require('fs');

const execFile = require('child_process').execFile;

exports.build = (request, response, callback) => {
    execFile('./ci.sh', (error, stdout, stderr) => {
        fileSystem.writeFile('ci_log.txt', error + stdout + stderr, (err) => {
            if(err) {
                console.log(err);
            }
        });
    });
    console.log('herpderp!');
    callback();
};

