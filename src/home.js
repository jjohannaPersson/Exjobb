import React, { useEffect, useState } from "react";
import db from "./utils/firebase.config";
import Button from 'react-bootstrap/Button';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import { LinkContainer } from 'react-router-bootstrap';
import { useAuth0 } from '@auth0/auth0-react';
import LoginButton from './components/login/Login';
import LogoutButton from './components/login/Logout';
import User from './components/login/User';

function Home() {
  const { user, isAuthenticated } = useAuth0();
  const [authedUser, setAuthedUser] = useState("");

    const fetchUsers = async() => {
    const response = db.collection('users');
    const data = await response.get();
    data.docs.forEach(element => {
        // setUsers([...users, element.data()]);
        if (user && element.data().email === user.email) {
          setAuthedUser(element.data());
          console.log(`From database: ${JSON.stringify(element.data())}`);
        }
    });
  }

  useEffect(() => {
    fetchUsers();
  }, [isAuthenticated])

    return (
        <div className="header">
            <h1>Grafer och Diagram</h1>
            <ButtonToolbar className="custom-btn-toolbar">
              <LinkContainer to="/create">
                <Button>Skapa nytt diagram</Button>
              </LinkContainer>
              <LinkContainer to="/view">
                <Button>Visa befintliga diagram</Button>
              </LinkContainer>
            </ButtonToolbar>
        </div>
      // <div className="wrapper">
      //         {!isAuthenticated ? (
      //   <div>
      //     <p style={{ fontSize: "1.5rem" }}>Please Login.</p>
      //      <LoginButton />
      //   </div>
      // ) :
      //   <><div className="header">
      //       <h1>Grafer och Diagram</h1>
      //       <ButtonToolbar className="custom-btn-toolbar">
      //         <LinkContainer to="/create">
      //           <Button>Skapa nytt diagram</Button>
      //         </LinkContainer>
      //         <LinkContainer to="/view">
      //           <Button>Visa befintliga diagram</Button>
      //         </LinkContainer>
      //       </ButtonToolbar>
      //     </div><div>
      //         <LogoutButton />
      //         <User />
      //       </div></>}
      // </div>
    );
}

export default Home;
