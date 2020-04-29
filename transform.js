const through = require('through2');

const stream = through(write, end);

function write(buffer, encoding, next) {
  let upper = buffer.toString().toUpperCase();
  this.push(upper);
  next();
}

function end(done) {
  done();
}

process.stdin.pipe(stream).pipe(process.stdout);