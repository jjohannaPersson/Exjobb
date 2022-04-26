import React, { useEffect, useState } from "react";
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
  const { docId, setDocId, folders, setFolders } = props;
  const { user, isAuthenticated } = useAuth0();
  const [ existingUser, setExistingUser ] = useState(false);


  useEffect(() => {
    const fetchUsers = async() => {

      let doc = await db.collection("users").doc(user.email).get();
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
      } else {
        await db.collection("users").doc(user.email).set({
          email: user.email
        });
        setDocId(user.email);
      }
    //   const usersCollection = await db.collection("users").get()
    //   usersCollection.docs.forEach(doc => {
    //     // setUsers([...users, doc.data()]);
    //     // user exists
    //     if (user && doc.data().email === user.email) {
    //       setExistingUser(true);
    //       // console.log(`From database: ${JSON.stringify(doc.data())}`);
    //       setDocId(doc.id);
    //       const unmount = db.collection("users").doc(doc.id).collection("folders").onSnapshot((snapshot) => {
    //         const tempFolders = [];
    //         snapshot.forEach((doc) => {
    //           tempFolders.push({ ...doc.data(), id: doc.id });
    //         });
    //         setFolders(tempFolders);
    //       });
    //       return unmount;
    //     }
    // });
    // // add new user
    // if (!existingUser) {
    //   let res = db.collection("users").add({
    //     email: user.email
    //   });
    //   setDocId(res.id);
    // }
    }
    if (isAuthenticated) {
      fetchUsers();
    }

  }, [user, docId, setDocId, setFolders, setExistingUser])


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
            </div></>}
      </div>
    );
}

export default Home;
