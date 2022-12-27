import React from 'react';
import { withAuthenticationRequired } from '@auth0/auth0-react';
import Greeting from './Greeting.jsx';
import Profile from './Profile.jsx';
import LoginButton from './LoginButton.jsx';
import LogoutButton from './LogoutButton.jsx';
import PDFLink from './PDFLinks.jsx';

function Page() {
  return (
    <div>
      <Greeting />
      <Profile />
      <hr />
      <LoginButton />
      <hr />
      <LogoutButton />
      <hr />
      <PDFLink />
    </div>
  );
}

export default withAuthenticationRequired(Page, {
  onRedirecting: () => <div>Redirecting...</div>,
});
