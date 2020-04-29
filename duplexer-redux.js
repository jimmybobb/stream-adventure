const duplex = require('duplexer2');
const through = require('through2');

module.exports = function(counter) {
  let counts = {};
  const ws = through.obj(countingFn, end);
  console.log(ws);
  return duplex({objectMode: true}, ws, counter);

  function countingFn(chunk, _, next) {
    counts[chunk.country] = (counts[chunk.country] || 0) + 1;
    next();
  }

  function end(done) {
    counter.setCounts(counts);
    done();
  }
};