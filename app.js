// Import http module
const http = require('http');

// express
var express = require('express');

// Import mongodb
var MongoClient = require('mongodb').MongoClient;

// Configure Server details
const hostname = '127.0.0.1';
const port = 3000;

// Open Server
const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World');
});

// listen
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});