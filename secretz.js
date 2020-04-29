const combine = require('stream-combiner');
const zlib = require('zlib');
const crypto = require('crypto');
const tar = require('tar');
const concat = require('concat-stream');

const unzip = zlib.createGunzip();
const passphrase = process.argv[3];
const algorithm = process.argv[2];
const decrypt  = crypto.createDecipher(algorithm, passphrase, null);
const parser = new tar.Parse();

parser.on('entry', function (e) {
  if(e.type !== 'File') { 
    return e.resume();
  }
  const hashStream = crypto.createHash('md5', {encoding: 'hex'});
  e.pipe(hashStream).pipe(concat(function(hash) {
    printFile(hash, e.path)
  }));
});

const printFile = function(md5HashFileConents, filename) {
  console.log(`${md5HashFileConents} ${filename}`);
}

combine(
  process.openStdin(),
  decrypt,
  unzip,
  parser
);