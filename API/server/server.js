/* eslint-disable no-console */
const express = require('express');
require('dotenv').config();
const path = require('path');
const { connectToDb } = require('./db');
const router = require('./mailRouter');

const app = express();

app.use(express.static('../App/dist'));

app.use('/api/user/mail', router);

// Catch-all route to redirect to main page.
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../../App/dist', 'index.html'));
});

const port = process.env.PORT;

(async function start() {
  await connectToDb();
  app.listen(port, () => console.log('App started on port 3000'));
})();
