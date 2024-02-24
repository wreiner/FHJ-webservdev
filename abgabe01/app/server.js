const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    console.log(req.url);
    if (req.url === '/') {
        fs.readFile(path.join(__dirname, '..', 'public', 'index.html'), (err, content) => {
            if (err) throw err;
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(content);
        });
    } else {
        const filePath = path.join(__dirname, '..', 'public', req.url);
        fs.readFile(filePath, (err, content) => {
            if (err) {
                if (err.code === 'ENOENT') {
                    // File not found
                    res.writeHead(404, { 'Content-Type': 'text/plain' });
                    res.end('File not found');
                } else {
                    // Other error
                    res.writeHead(500, { 'Content-Type': 'text/plain' });
                    res.end('Internal server error');
                }
            } else {
                // File found
                res.writeHead(200);
                res.end(content);
            }
        });
    }
});

server.listen(3000, () => {
    console.log('Server running...');
});

