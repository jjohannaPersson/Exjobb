import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

function User() {
    const { user, isAuthenticated } = useAuth0();

  return (
  isAuthenticated && (
    <div>Hello {user.email}</div>
    )
  );
}

export default User;
