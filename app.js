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

// Load public JS
app.use(express.static('public'))

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
    app.use(bodyParser.json())

    // Set up request and response. endpoint = '/'
    app.get('/', (req, res) => {
      // Cursor to read from mdb
      const cursor = db.collection('events').find().toArray()
        .then(results => {
          // Send index as embedded javascript
          res.render('index.ejs', {quotes: results});
        })
        .catch(error => console.error(error))
      
      
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

    // Update quotes on button press
    app.put('/quotes', (req, res) => {
      eventCollection.findOneAndUpdate(
        { name: 'sticky steve' }, // query
        { // update
          $set: {
            name: req.body.name,
            quote: req.body.quote
          }
        },
        { // options
          upsert: true
        }
      )
      .then(result => {
        res.json('Success')
      })
      .catch(error => console.error(error))
    })

    // Delete Quotes on button Press
    app.delete('/quotes', (req, res) => {
      eventCollection.deleteOne(
        { name: req.body.name }
      )
      .then(result => {
        if (result.deletedCount === 0) {
          return res.json('No quote to delete')
        }
        res.json(`Deleted Paul's quote`)
      })
      .catch(error => console.error(error))
    })

    // Open express app
    app.listen(port, () => {
      console.log('Listining on port:' + port);
    })

  })
  .catch(error => console.error(error))





