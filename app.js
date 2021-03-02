const http = require('http');
const path = require('path');


const express = require('express');
const MongoClient = require('mongodb').MongoClient;


// Express App
const app = express();
const hostname = '127.0.0.1';
const port = 3000;

// Set up request and response. endpoint = '/'
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/index.html'));
})

// Open express app
app.listen(port, function() {
    console.log('Listining on port:' + port);
})