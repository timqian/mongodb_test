// do this first: mongod --dbpath ~/data/db
'use strict'

let MongoClient = require('mongodb').MongoClient
  , assert = require('assert');

// Connection URL
let url = 'mongodb://localhost:27017/myproject';
// Use connect method to connect to the Server
MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  console.log("Connected correctly to server");
  insertDocuments(db, function() {
    db.close();
  });
});

let insertDocuments = function(db, callback) {
  // Get the documents collection
  let collection = db.collection('documents');
  // Insert some documents
  collection.insert([
    {a : 1}, {a : 2}, {a : 3}
  ], function(err, result) {
    assert.equal(err, null);
    assert.equal(3, result.result.n);
    assert.equal(3, result.ops.length);
    console.log("Inserted 3 documents into the document collection");
    callback(result);
  });
}
