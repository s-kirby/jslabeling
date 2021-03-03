//* Built in Modules
const fs = require('fs');
const http = require('http');
const path = require('path');

//* Third-Party Modules
const bodyParser = require('body-parser');
const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const mongoose = require('mongoose');
const BoxSDK = require('box-node-sdk');

// Environment
const mongoUrl = 'mongodb://127.0.0.1:27017';
const hostname = '127.0.0.1';
const port = 3000;


// Set up and Authenticate BoxSDK
const userKeys = require('./private/userKeys.js');
const sdkConfig = require('./private/TrafficNetMongo.json');
const sdk = BoxSDK.getPreconfiguredInstance(sdkConfig);
//var serviceAccountClient = sdk.getAppAuthClient('enterprise');
// Get an app user client
var boxClient = sdk.getAppAuthClient('user', userKeys.skirby);

// Express App
const app = express();
app.use(express.static('public'))
app.set('view engine', 'ejs')


// Testing box sdk
boxClient.folders.get('130038818824')
  .then(folder => {
    console.log("Found folder. Name: " + folder.name)
  })
.catch(error => console.error(error))


// Connect to mongodb
MongoClient.connect(mongoUrl, { useUnifiedTopology: true })
  .then(client => {
    // Print success message
    console.log('Connected to Database')

    // Open specified database
    const db = client.db('trafficNet')
    const samples = db.collection('testingSamples')

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
        .catch(error => console.error(error));
    })


    app.get('/label', (req, res) => {

      // Load initial image
      samples.findOne({'review': null})
        .then(result => {

          // Get box preview from sample
          boxClient.files.getReadStream(result.box_id)
            .then(stream => {

              // Show Completion
              console.log("Read Stream: " + result.box_id)
              
              // Save to file
              var outPath = `${__dirname}/public/image_cache/${result.name}`;
              console.log("Creating output under: " + outPath)
              
              // Pipe to created path in cache
              let output = fs.createWriteStream(outPath);
              let downloadStream = stream.pipe(output);
              
              downloadStream.on('finish', () => {
                
                var htmlPath = `/image_cache/${result.name}`;
                console.log("File Saved to: " + htmlPath)
                res.render('label.ejs', {imageSource: htmlPath});
              })
            
            })
            .catch(error => console.error(error));
          })         
          .catch(error => console.error(error));
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



  })
  .catch(error => console.error(error))


// Open express app
app.listen(port, () => {
  console.log('Listining on port:' + port);
})
