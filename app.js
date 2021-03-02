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



// Connect to mongodb
MongoClient.connect(connectionString, { useUnifiedTopology: true })
  .then(client => {
    // Print success message
    console.log('Connected to Database')

    // Open specified database
    const db = client.db('jslabeling')
    const eventCollection = db.collection('events')

    // Set view engine
    app.set('view engine', 'ejs')

    // body-parser middleware
    app.use(bodyParser.urlencoded({ extended: true }))


    // Set up request and response. endpoint = '/'
    app.get('/', (req, res) => {
      // Cursor to read from mdb
      const cursor = db.collection('events').find().toArray()
        .then(results => {
          console.log(results)
        })
        .catch(error => console.error(error))
      
      // Send index html
      res.sendFile(path.join(__dirname + '/index.html'));
    })

    // Form functionality
    app.post('/quotes', (req, res) => {
      // Add request body to collection
      eventCollection.insertOne(req.body)
        .then(result => {
          console.log(result)
          res.redirect('/')
        })
        .catch(error => console.error(error))
    })

    // Open express app
    app.listen(port, () => {
      console.log('Listining on port:' + port);
    })

  })
  .catch(error => console.error(error))





