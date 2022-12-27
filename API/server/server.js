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

const mockUserDB = [
  {
    name: 'David',
    id: 'auth0|639b6ea8868c06d59722f51d',
    dir: 'test/',
  },
  {
    name: 'Darklord47',
    id: 'auth0|63ab14fa5ade362990d11c3e',
    dir: 'user2/',
  },
];

app.get('/api/user/pdfs', jwtCheck, async (req, res) => {
  const keyFileName = process.env.GOOGLE_CLOUD_STORAGE_KEY_FILE;
  const storage = new Storage({ keyFileName });

  // TODO: VERY IMPORTANT!!!!!!!!!! (David)
  // I need to add error handling with express to handle what happens if
  // the user isn't in the DB or the user's directory prefix isn't in the DB.

  const authenticatedUserID = req.auth.sub;
  const authenticatedUser = mockUserDB.find(
    (user) => user.id === authenticatedUserID,
  );
  const userDirectory = authenticatedUser.dir;

  if (!userDirectory) {
    return res.json({ pdfs: [] });
  }

  const [files] = await storage
    .bucket('digital_main_test_bucket')
    .getFiles({ prefix: userDirectory });

  const pdfs = files.filter((file) => file.name.endsWith('.pdf'));

  const signedUrls = await Promise.all(
    pdfs.map((file) => {
      const options = {
        action: 'read',
        expires: Date.now() + 1000 * 60 * 60, // 1 hour
      };
      return file.getSignedUrl(options);
    }),
  );

  return res.json({
    pdfs: signedUrls,
  });
});

app.listen(3000, () => console.log('App started on port 3000'));
