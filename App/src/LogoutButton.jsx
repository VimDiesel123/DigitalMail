import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

function LogoutButton() {
  const { logout } = useAuth0();
  return (
    <button
      type="button"
      onClick={() => {
        console.log('Logging out.');
        logout({ returnTo: 'http://localhost:3000/api/greeting' });
      }}
    >
      Log Out
    </button>
  );
}

export default LogoutButton;
