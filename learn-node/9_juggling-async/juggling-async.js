'use strict';
const http = require('http');
const urls = process.argv.splice(2);
const result = [];
let count = 0;

function printResult() {
    result.forEach(data => {
        console.log(data);
    })
}

function httpGet(url, index) {
    http.get(url, res => {
        let resultData = "";
        res.setEncoding('utf8');
        res.on('data', data => resultData += data);
        res.on('end', () => {
            result[index] = resultData;
            count++;

            if (count === 3) {
                printResult();
            }
        });
    });
}

for (let i = 0; i < 3; i++) {
    httpGet(urls[i], i);
}