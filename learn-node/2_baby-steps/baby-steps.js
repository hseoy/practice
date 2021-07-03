'use strict'

const result = process.argv.reduce((acc, cur, i) => i > 1 ? acc + Number(cur) : acc, 0);

console.log(result);