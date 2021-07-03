'use strict';
const fs = require('fs');
const path = require('path');

const directory = process.argv[2];
const ext = '.' + process.argv[3];

fs.readdir(directory, 'utf8', (err, files) => {
    if (err) {
        return console.log(err);
    }
    files.filter(e => path.extname(e) === ext).forEach(e => console.log(e));
})