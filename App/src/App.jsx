import React from 'react';
import { createRoot } from 'react-dom/client';
import { Auth0Provider } from '@auth0/auth0-react';
import Page from './Page.jsx';

import 'bootstrap/dist/css/bootstrap.min.css';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <Auth0Provider
    domain="dev-6xzvx6amw4huzdgq.us.auth0.com"
    clientId="rcemq97nBaT1z5qWiuzy2JzeuE2qXoNI"
    redirectUri="http://localhost:3000"
    audience="https://digitalmail.com/api"
  >
    <Page />
  </Auth0Provider>
);

console.log('ESlint should warn about me here but not in the server.');
