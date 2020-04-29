var crypto = require('crypto');
const passphrase = process.argv[2];
const algorithm = 'aes-256-cbc';
var stream = crypto.createDecipher(algorithm, passphrase, null);
process.stdin.pipe(stream);
stream.pipe(process.stdout);