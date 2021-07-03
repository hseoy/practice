'use strict';
const extFilter = require('./mymodule');
const dir = process.argv[2];
const ext = process.argv[3];

extFilter(dir, ext, (err, files) => {
    if (err) {
        console.log(err);
    }
    files.forEach(f => console.log(f));
});