import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Button } from 'react-bootstrap';

function LoginButton() {
  const { loginWithRedirect } = useAuth0();

  return (
    <Button type="button" onClick={() => loginWithRedirect()}>
      Log In
    </Button>
  );
}

export default LoginButton;
