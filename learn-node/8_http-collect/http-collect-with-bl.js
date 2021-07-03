'use strict';
const http = require('http');
const bl = require('bl');
const url = process.argv[2];

http.get(url, res => {
    res.pipe(bl((err, data) => {
        if (err) {
            return console.error(err);
        }
        const dataStr = data.toString();
        console.log(dataStr.length);
        console.log(dataStr);
    }));
}).on('error', console.error);