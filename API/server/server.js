const express = require('express');
require('dotenv').config();
const { Storage } = require('@google-cloud/storage');
const { expressjwt: jwt } = require('express-jwt');
const jwks = require('jwks-rsa');

const app = express();

app.use(express.static('../App/dist'));

const greetingMessage = 'Hello from the API!';

app.get('/api/greeting', (req, res) => {
  res.send(greetingMessage);
});

const jwtCheck = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: 'https://dev-6xzvx6amw4huzdgq.us.auth0.com/.well-known/jwks.json',
  }),
  audience: 'https://digitalmail.com/api',
  issuer: 'https://dev-6xzvx6amw4huzdgq.us.auth0.com/',
  algorithms: ['RS256'],
});

app.get('/api/pdf', jwtCheck, async (req, res) => {
  console.log('%cHERE!!!!!!!', 'color:red');
  console.log('Request object', req);
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
