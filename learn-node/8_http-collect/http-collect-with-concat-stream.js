'use strict';
const http = require('http');
const concatStream = require('concat-stream');
const url = process.argv[2];

http.get(url, res => {
    res.pipe(concatStream(data => {
        const dataStr = data.toString();
        console.log(dataStr.length);
        console.log(dataStr);
    }));
}).on('error', console.error);