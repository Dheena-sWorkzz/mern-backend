// Import required modules
const http = require('http');
const { MongoClient } = require('mongodb');
const url = 'mongodb://localhost:3000';
const dbName = 'my_database';

// Create a simple HTTP server
const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello World!\n');
});

// Connect to MongoDB and start the server
MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
  if (err) {
    console.error('Error connecting to MongoDB:', err);
    return;
  }
  console.log('Connected to MongoDB');

  // Specify the database and collection
  const db = client.db(dbName);
  const collection = db.collection('users');

  // Perform MongoDB operations here
  // For example, you can insert a document
  collection.insertOne({ name: 'John', age: 30 })
    .then(result => {
      console.log('Inserted document:', result.insertedId);
    })
    .catch(err => {
      console.error('Error inserting document:', err);
    });

  // Start the HTTP server
  const port = process.env.PORT || 3000;
  server.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
  });
});
