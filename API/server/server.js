const express = require('express');
require('dotenv').config();
const { expressjwt: jwt } = require('express-jwt');
const jwks = require('jwks-rsa');
const path = require('path');
const { connectToDb } = require('./db');
const user = require('./user');
const signedUrls = require('./signed_url');

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

app.get('/api/user/pdfs', jwtCheck, async (req, res) => {
  // TODO: VERY IMPORTANT!!!!!!!!!! (David)
  // I need to add error handling with express to handle what happens if
  // the user isn't in the DB or the user's directory prefix isn't in the DB.

  const authenticatedUserID = req.auth.sub;
  const authenticatedUser = await user.byID(authenticatedUserID);
  const userDirectory = authenticatedUser.dir;

  if (!userDirectory) {
    return res.json({ pdfs: [] });
  }

  const mail = await signedUrls.withSignedUrl(authenticatedUser.mail);

  console.log(mail);

  return res.json({
    mail,
  });
});

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../../App/dist', 'index.html'));
});

(async function start() {
  await connectToDb();
  app.listen(3000, () => console.log('App started on port 3000'));
})();
