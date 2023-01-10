const express = require('express');
require('dotenv').config();
const { expressjwt: jwt } = require('express-jwt');
const jwks = require('jwks-rsa');
const path = require('path');
const { connectToDb } = require('./db');
const user = require('./user');
const signedUrls = require('./signed_url');
const mail = require('./mail');

const app = express();

app.use(express.static('../App/dist'));

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

// Return all mail items for user.
app.get('/api/user/pdfs', jwtCheck, async (req, res) => {
  // TODO: VERY IMPORTANT!!!!!!!!!! (David)
  // I need to add error handling with express to handle what happens if
  // the user isn't in the DB.

  const authenticatedUserID = req.auth.sub;
  const authenticatedUser = await user.byID(authenticatedUserID);

  if (!authenticatedUser) {
    return res.json({ pdfs: [] });
  }

  const mailWithUrls = await signedUrls.withSignedUrl(authenticatedUser.mail);

  return res.json({
    mail: mailWithUrls,
  });
});

// Mark mail item as read:
app.patch('/api/user/pdfs/:id', async (req, res) => {
  const markedAsRead = await mail.markAsRead(req.params.id);

  if (!markedAsRead) {
    res.sendStatus(500);
  } else {
    res.sendStatus(200);
  }
});

// Catch-all route to return home page.
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../../App/dist', 'index.html'));
});

(async function start() {
  await connectToDb();
  app.listen(3000, () => console.log('App started on port 3000'));
})();
