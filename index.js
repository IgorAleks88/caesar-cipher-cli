const { error } = require('console');
const { program } = require('commander');
const { Transform } = require('stream');
const fs = require('fs');

const {cipher} = require('./caesar-cipher');

class CounterTransform extends Transform {
    constructor (rot) {
        super();
        this.rot = rot;
    }
    _transform(chunk, encoding, callback) {
      try {
        const chunkArr = chunk.toString().split('');
        const resultString = cipher(chunkArr, this.rot).join('');
  
        callback(null, resultString);
      } catch (err) {
        callback(err);
      }
    }
  }

program
  .requiredOption('-s, --shift <number>', 'shift')
  .option('-i, --input <string>', 'input file path')
  .option('-o, --output <string>', 'output file path')
  .requiredOption('-a, --action <string>', 'action type');

program.parse(process.argv);
const options = program.opts();
if (typeof options.shift !== 'number') {
  process.stderr.write(`required option '-s, --shift <number>' is not a number`, () => process.exit(1))
}
let shift = parseInt(options.shift, 10);
if (options.action === 'decode') { shift *= (-1)}
else if ( options.action !== 'encode') {
  process.stderr.write(`required option '-a, --action <string>' supposed to be "encode" or "decode"`, () => process.exit(1))
}

shift = shift % 26;

let rs = process.stdin;
const ts = new CounterTransform(shift);
let ws = process.stdout;

if (options.input) {
    if (fs.access)
    {rs = fs.ReadStream(options.input)}
}
if (options.output) {ws = fs.WriteStream(options.output)}


rs.pipe(ts).pipe(ws);

