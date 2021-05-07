const { error } = require('console');
const fs = require('fs');

const rs = fs.ReadStream('./input.txt');
const ws = fs.WriteStream('./output.txt');

rs.pipe(ws);

