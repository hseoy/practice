'use strict';
const net = require('net');

function zeroFill(num, length) {
    const str = num.toString();
    return str.length < length ? "0".repeat(length - str.length) + str : str;
}

function now() {
    const date = new Date();
    const year = zeroFill(date.getFullYear(), 4);
    const month = zeroFill(date.getMonth() + 1, 2);
    const day = zeroFill(date.getDate(), 2);
    const hour = zeroFill(date.getHours(), 2);
    const minutes = zeroFill(date.getMinutes(), 2);
    
    return `${year}-${month}-${day} ${hour}:${minutes}`;
}

const server = net.createServer(socket => {
    socket.end(now() + '\n');
});

server.listen(Number(process.argv[2]));