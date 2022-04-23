import React, { useEffect } from "react";
import { app } from "./utils/firebase.config";
import Button from 'react-bootstrap/Button';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import { LinkContainer } from 'react-router-bootstrap';
import { useAuth0 } from '@auth0/auth0-react';
import LoginButton from './components/login/Login';
import LogoutButton from './components/login/Logout';
import User from './components/login/User';

const db = app.firestore();

function Home(props) {
  const { docId, setDocId } = props;
  const { user, isAuthenticated } = useAuth0();


  useEffect(() => {
    const fetchUsers = async() => {
      const usersCollection = await db.collection("users").get()
      usersCollection.docs.forEach(doc => {
        // setUsers([...users, doc.data()]);
        if (user && doc.data().email === user.email) {
          // console.log(`From database: ${JSON.stringify(doc.data())}`);
          setDocId(doc.id);
        }
    });
    }
    fetchUsers();
  }, [user, docId, setDocId])


    return (
      <div className="wrapper">
              {!isAuthenticated ? (
        <div>
          <p style={{ fontSize: "1.5rem" }}>Please Login.</p>
            <LoginButton />
        </div>
      ) :
        <><div className="header">
            <h1>Grafer och Diagram</h1>
            <ButtonToolbar className="custom-btn-toolbar">
              <LinkContainer to="/create">
                <Button>Skapa nytt diagram</Button>
              </LinkContainer>
              <LinkContainer to="/example">
                <Button>Visa befintliga diagram</Button>
              </LinkContainer>
              <LinkContainer to="/view">
                <Button>Ladda upp och visa befintliga diagram</Button>
              </LinkContainer>
            </ButtonToolbar>
          </div><div>
              <LogoutButton />
              <User />
            </div>
            </>
            }
      </div>
    );
}

export default Home;
