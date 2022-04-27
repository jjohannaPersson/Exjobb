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
  const { docId, setDocId, setFolders } = props;
  const { user, isAuthenticated } = useAuth0();


  useEffect(() => {
    const fetchUsers = async() => {

      let doc = await db.collection("users").doc(user.email).get();
      // user exists
      if (doc && doc.exists) {
        setDocId(doc.id);
        const unmount = db.collection("users").doc(doc.id).collection("folders").onSnapshot((snapshot) => {
          const tempFolders = [];
          snapshot.forEach((doc) => {
            tempFolders.push({ ...doc.data(), id: doc.id });
          });
          setFolders(tempFolders);
        });
        return unmount;
      // new user
      } else {
        await db.collection("users").doc(user.email).set({
          email: user.email
        });
        setDocId(user.email);
      }
    }
    if (isAuthenticated) {
      fetchUsers();
    }

  }, [user, docId, setDocId, setFolders, isAuthenticated])


    return (
        // <div className="header">
        //     <h1>Grafer och Diagram</h1>
        //     <ButtonToolbar className="custom-btn-toolbar">
        //       <LinkContainer to="/create">
        //         <Button>Skapa nytt diagram</Button>
        //       </LinkContainer>
        //       <LinkContainer to="/example">
        //         <Button>Visa befintliga diagram</Button>
        //       </LinkContainer>
        //       <LinkContainer to="/view">
        //         <Button>Ladda upp och visa befintliga diagram</Button>
        //       </LinkContainer>
        //     </ButtonToolbar>
        // </div>
      <div className="wrapper">
              {!isAuthenticated ? (
        <div>
          <p style={{ fontSize: "1.5rem" }}>Logga in.</p>
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
            </div></>}
      </div>
    );
}

export default Home;
