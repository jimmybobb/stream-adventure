const combine = require('stream-combiner');
const through = require('through2');
const { createGzip } = require('zlib');
const gzip = createGzip();
const split = require('split');

module.exports = function() {
    let genre = null;
    function grouperFunc(chunk, enc, next) {
    if(chunk.genre) {
      genre = chunk.name;
      next();
    } 
    else {
      this.push(
        {
          name: genre,
          books: chunk.name
        });
    next();    }
  }
  const group = through(grouperFunc)
  
  return combine(
    split(),
    group,
    gzip
  );
}