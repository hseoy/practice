'use strict';
const fs = require('fs');
const path = require('path');

module.exports = function (dir, ext, callback) {
    fs.readdir(dir, 'utf8', (err, files) => {
        if (err) {
            return callback(err);
        }
        return callback(null, files.filter(e => path.extname(e) === '.' + ext));
    });
}