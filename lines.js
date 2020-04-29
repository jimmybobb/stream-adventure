const split = require('split');
const through2 = require('through2');
let counter = 0;

const trans = function(chunk, encoding, next) {
  counter ++;
  if(counter % 2 == 1) {
    this.push(chunk.toString().toLowerCase() + '\n');
  } else {
    this.push(chunk.toString().toUpperCase() + '\n');
  }
  next();
}

process.stdin
  .pipe(split())
  .pipe(through2(trans))
  .pipe(process.stdout);

