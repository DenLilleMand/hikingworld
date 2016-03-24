var exports = module.exports;

const execFile = require('child_process').execFile;

exports.build = (request, response, callback) => {
    execFile('./ci.sh');
    console.log('herpderp!');
    callback();
};

