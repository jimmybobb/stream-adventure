const spawn = require('child_process').spawn;
const duplex = require('duplexer');

module.exports = function(cmd, args) {
  const childproc = spawn(cmd, args);
  return duplex(childproc.stdin, childproc.stdout);
};