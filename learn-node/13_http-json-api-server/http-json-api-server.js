'use strict';
const http = require('http');
const url = require('url');
const port = Number(process.argv[2]);

function parseTime(time) {
    return {
        hour: time.getHours(),
        minute: time.getMinutes(),
        second: time.getSeconds()
    };
}

function unixTime(time) {
    return { unixtime: time.getTime() };
}

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    let result;
    const date = new Date(parsedUrl.query.iso);
    
    if (parsedUrl.pathname === '/api/parsetime') {
        result = parseTime(date);
    } else if (parsedUrl.pathname === '/api/unixtime') {
        result = unixTime(date);
    }

    if (result) {
        res.writeHead(200, { 'content-type': 'application/json' });
        res.end(JSON.stringify(result));
    } else {
        res.writeHead(404);
        res.end();
    }
});
server.listen(port);