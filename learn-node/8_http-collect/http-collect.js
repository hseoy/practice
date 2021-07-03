'use strict';
const http = require('http');
const url = process.argv[2];

http.get(url, res => {
    let allData = "";
    res.setEncoding('utf8');
    res.on('data', data => allData += data);
    res.on('end', () => {
        console.log(allData.length);
        console.log(allData);
    });
}).on('error', console.error);