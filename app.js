// Import http module
const http = require('http');

// express
const express = require('express');

// Import mongodb
const MongoClient = require('mongodb').MongoClient;

// Express App
const app = express();

// Configure Server details
const hostname = '127.0.0.1';
const port = 3000;


// Open express app
app.listen(port, function() {
    console.log('Listining on port:' + port)
})