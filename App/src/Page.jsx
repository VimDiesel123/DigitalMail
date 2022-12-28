import React from 'react';
import { withAuthenticationRequired } from '@auth0/auth0-react';
import Greeting from './Greeting.jsx';
import PDFLink from './PDFLinks.jsx';
import NavBar from './NavBar/NavBar.jsx';

function Page() {
  return (
    <div>
      <NavBar />
      <Greeting />
      <PDFLink />
    </div>
  );
}

export default withAuthenticationRequired(Page, {
  onRedirecting: () => <div>Redirecting...</div>,
});
