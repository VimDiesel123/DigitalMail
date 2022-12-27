require('dotenv').config();
const { MongoClient } = require('mongodb');

let db;

async function connectToDb() {
  const uri = process.env.DB_URI;
  const client = new MongoClient(uri, { useNewUrlParser: true });
  await client.connect();
  console.log('Connected to MongoDB at', uri);
  db = client.db('DigitalMail');
}

function getDb() {
  return db;
}

module.exports = { getDb, connectToDb };
