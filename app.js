//* Built in Modules
const http = require('http');
const path = require('path');

//* Third-Party Modules
const bodyParser = require('body-parser');
const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const mongoose = require('mongoose');

// Environment
const connectionString = 'mongodb://127.0.0.1:27017';
const hostname = '127.0.0.1';
const port = 3000;

// Express App
const app = express();

// body-parser middleware
app.use(bodyParser.urlencoded({ extended: true }))

// Connect to mongodb
MongoClient.connect(connectionString, {
    useUnifiedTopology: true
  }, (err, client) => {
  // Simple error checking
  if (err) return console.error(err)
  console.log('Connected to Database')
})

// Open express app
app.listen(port, () => {
  console.log('Listining on port:' + port);
})

// Set up request and response. endpoint = '/'
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/index.html'));
})

// Form functionality
app.post('/quotes', (req, res) => {
  console.log(req.body)
})

