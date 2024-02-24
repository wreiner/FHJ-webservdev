const fs = require('fs');

function readFilePromise(filePath) {
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

function readFile(filePath, callback) {
    console.log('readFile() ' + filePath);
    readFilePromise(filePath)
        .then((data) => {
            callback(null, data);
        })
        .catch((err) => {
            callback(err);
        });
}

function readImageFile(filePath, callback) {
    console.log('readImageFile() ' + filePath);
    readImageFilePromise(filePath)
        .then((data) => {
            callback(null, data);
        })
        .catch((err) => {
            callback(err);
        });
}

function readImageFilePromise(filePath) {
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

module.exports = {
    readFile: readFile,
    readImageFile: readImageFile
};
