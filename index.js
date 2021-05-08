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
        // const resultString = `*${chunk.toString('utf8')}*`;

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
let shift = parseInt(options.shift, 10);
if (options.action === 'decode') { shift *= (-1)}
else if ( options.action !== 'encode') {
  throw error('Invalid action');
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

