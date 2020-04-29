const through2 = require('through2');
const http = require('http');
const port = process.argv[2];

const server = http.createServer((req, res) =>{
  if(req.method === 'POST') {
    req.pipe(through2(write, end)).pipe(res);
  }
});

function write(chunk, enc, next) {
  this.push(chunk.toString().toUpperCase());
  next();
}

function end(done) {
  done();
}

server.listen(port);