const concat = require('concat-stream');
// const reversedStream = concat(reversed);
process.stdin.pipe(concat(body => {
  let reversedString = '';
  body = body.toString();
  for(i = 0; i < body.length; i++) {
    reversedString = body.charAt(i) + reversedString;
  }

  process.stdout.write(reversedString);
}));
