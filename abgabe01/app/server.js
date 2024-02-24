const http = require('http');
const fs = require('fs');
const path = require('path');
const customReadModule = require('./helper/read.js');
const url = require('url');


const server = http.createServer((req, res) => {
    const urlstring = url.parse(req.url, true);
    console.log(urlstring);
    const resourcePath = path.join(__dirname, '..', 'public');

    if (urlstring.path.includes('css')) {
        console.log('css');
        customReadModule.readFile(resourcePath + '/css/style.css', (err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/css' });
                res.end('Internal server error');
            } else {
                res.writeHead(200);
                res.end(data);
            }
        });
    } else if (urlstring.path.includes('js')) {
        console.log('js');
        customReadModule.readFile(resourcePath + '/js/script.js', (err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/javascript' });
                res.end('Internal server error');
            } else {
                res.writeHead(200);
                res.end(data);
            }
        });
    } else if (urlstring.path.includes('html')) {
        console.log('html');
        res.writeHead(200, { 'Content-Type': 'text/html' });
        customReadModule.readFile(resourcePath + '/index.html', (html) => res.end(html));
    } else if (urlstring.path.includes('png')) {
        console.log('png');
        customReadModule.readImageFile(resourcePath + req.url, (err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'image/png' });
                res.end('Internal server error');
            } else {
                res.writeHead(200, { 'Content-Type': 'image/png' });
                res.end(data);
            }
        });
    } else {
        console.log('else');
        customReadModule.readFile(resourcePath + '/index.html', (err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Internal server error');
            } else {
                res.writeHead(200);
                res.end(data);
            }
        });
    }
});

server.listen(3000, () => {
    console.log('Server running...');
});

