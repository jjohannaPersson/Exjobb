import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Button from 'react-bootstrap/Button';

const LogoutButton = () => {
  const { logout } = useAuth0();

  return (
    <Button variant="outline-primary" onClick={() => logout({ returnTo: window.location.origin })}>
      Logga ut
    </Button>
  );
};

export default LogoutButton;
