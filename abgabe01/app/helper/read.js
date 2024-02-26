const fs = require('fs');


function readFilesPromise(filePath, callback) {
    console.log('readFiles() ' + filePath);

    if (filePath.endsWith('.css') || filePath.endsWith('.js') || filePath.endsWith('.html')) {
        return new Promise((resolve, reject) => {
            fs.readFile(filePath, 'utf8', (err, data) => {
                if (err) {
                    console.error(err);
                    reject(err);
                } else {
                    console.log(data);
                    resolve(data);
                }
            });
        });
    }

    return new Promise((resolve, reject) => {
        fs.readFile(filePath, (err, data) => {
            if (err) {
                console.error(err);
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
}

function readFile(filePath, callback) {
    console.log('readFile() ' + filePath);
    readFilesPromise(filePath)
        .then((data) => {
            callback(null, data);
        })
        .catch((err) => {
            callback(err);
        });
}

module.exports = {
    readFile: readFile,
    readImageFile: readImageFile,
    readTextFile: readTextFile,
};
