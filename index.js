const http = require('http');
const emitter = require('./event');

let server = http.createServer((req, res) => {
    switch(req.url){
        case '/api/list':
            emitter.emit('callReadFile', res);
    }
}).listen(8080);