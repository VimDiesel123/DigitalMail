/* eslint-disable no-console */
const express = require('express');
require('dotenv').config();
const { expressjwt: jwt } = require('express-jwt');
const jwks = require('jwks-rsa');
const { connectToDb } = require('./db');
const router = require('./mailRouter');

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

app.use(jwtCheck);

app.use(router);

(async function start() {
  await connectToDb();
  app.listen(3000, () => console.log('App started on port 3000'));
})();
