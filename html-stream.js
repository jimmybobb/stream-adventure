const trumpet = require('trumpet');
const tr = trumpet();
const through = require('through2');

const loud = tr.select('.loud').createStream();

const capitalise = function(chunk, _, callback) {
  this.push(chunk.toString().toUpperCase());
  callback();
}

loud.pipe(through(capitalise)).pipe(loud);

process.stdin.pipe(tr).pipe(process.stdout);

// var trumpet = require('trumpet');
// var through = require('through2');
// var tr = trumpet();

// var loud = tr.select('.loud').createStream();
// loud.pipe(through(function (buf, _, next) {
//     this.push(buf.toString().toUpperCase());
//     next();
// })).pipe(loud);

// process.stdin.pipe(tr).pipe(process.stdout);
