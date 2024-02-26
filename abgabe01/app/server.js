const http = require('http');
const path = require('path');
const url = require('url');

const customReadModule = require('./helper/read.js');


const server = http.createServer((req, res) => {
    const urlstring = url.parse(req.url, true);
    console.log(urlstring);
    console.log('Request: ' + req.url);
    const resourcePath = path.join(__dirname, '..', 'public');

    let contentType = 'text/html';
    switch (path.extname(req.url)) {
        case '.css':
            contentType = 'text/css';
            break;
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.png':
            contentType = 'image/png';
            break;
    }

    let requestPath = req.url;
    if (requestPath === '/') {
        requestPath = '/index.html';
    }

    console.log('contentType: ' + contentType);
    customReadModule.readFile(resourcePath + requestPath, (err, data) => {
        if (err) {
            res.writeHead(500, { 'Content-Type': contentType });
            res.end('Internal server error');
        } else {
            res.writeHead(200);
            res.end(data);
        }
    });
});

server.listen(3000, () => {
    console.log('Server running...');
});

