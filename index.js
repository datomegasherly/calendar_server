const http = require('http');

let server = http.createServer((req, res) => {
    res.write('Application Base');
    res.end();
}).listen(8080);