const express = require('express');
require('dotenv').config();
const { Storage } = require('@google-cloud/storage');

const app = express();

app.use(express.static('../App/dist'));

const greetingMessage = 'Hello from the API!';

app.get('/api/greeting', (req, res) => {
  res.send(greetingMessage);
});

app.get('/api/pdf', async (req, res) => {
  const keyFileName = process.env.GOOGLE_CLOUD_STORAGE_KEY_FILE;
  const storage = new Storage({ keyFileName });

  const bucket = storage.bucket('digital_main_test_bucket');
  const pdfFile = bucket.file('test/ADA Dental Claim Example001.pdf');

  const signedURL = await pdfFile.getSignedUrl({
    action: 'read',
    expires: '12/20/2022',
  });

  res.json({
    pdfUrl: signedURL,
  });
});

app.listen(3000, () => console.log('App started on port 3000'));
