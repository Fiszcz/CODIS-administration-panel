const express = require('express');
const path = require('path');
const app = express();

export const serveAdministrationPanel = () => {
    app.use(express.static(path.join(__dirname, '../build')));

    app.get('/', function(req, res) {
        res.sendFile(path.join(__dirname, '../build', 'index.html'));
    });

    app.listen(9000);

    console.log('-------------------------------------------');
    console.log('CODIS Administration Panel - localhost:9000');
    console.log('-------------------------------------------');
};

serveAdministrationPanel();
