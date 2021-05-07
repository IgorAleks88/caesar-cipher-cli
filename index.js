const { error } = require('console');
const { program } = require('commander');
const { Transform } = require('stream');
const fs = require('fs');

class CounterTransform extends Transform {
    constructor (rot) {
        super();
        this.rot = rot;
    }
    _transform(chunk, encoding, callback) {
      try {
        // const resultString = `*${chunk.toString('utf8')}*`;

        const chunkArr = chunk.toString().split('');
        const resultString = chunkArr.join(this.rot);
  
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
console.log(options);

const rs = fs.ReadStream('./input.txt');
const ts = new CounterTransform('w');
const ws = fs.WriteStream('./output.txt');


rs.pipe(ts).pipe(ws);

