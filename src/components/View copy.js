import React, { useEffect, useState } from "react";
import { app } from "../utils/firebase.config";
import Button from 'react-bootstrap/Button';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import { LinkContainer } from 'react-router-bootstrap';
import { useAuth0 } from '@auth0/auth0-react';


const db = app.firestore();

function View(props) {
    const { docId} = props;
    const { user, isAuthenticated } = useAuth0();
    const [authedUser, setAuthedUser] = useState({});
    const [fileUrl, setFileUrl] = useState(null);
    const [graphs, setGraphs] = useState([]);

  //   const fetchUsers = async() => {
  //   const usersCollection = await db.collection("users").get()
  //   usersCollection.docs.forEach(doc => {
  //     // setUsers([...users, doc.data()]);
  //     if (user && doc.data().email === user.email) {
  //       setAuthedUser(doc.data());
  //       console.log(`From database: ${JSON.stringify(doc.data())}`);
  //       console.log(authedUser.email);
  //     }
  // });

  //   // const response = db.collection("users");
  //   // const data = await response.get();
  //   // data.docs.forEach(element => {
  //   //     // setUsers([...users, element.data()]);
  //   //     if (user && element.data().email === user.email) {
  //   //       setAuthedUser(element.data());
  //   //       console.log(`From database: ${JSON.stringify(element.data())}`);
  //   //       console.log(authedUser.email);
  //   //     }
  //   // });
  // }

  const onFileChange = async (e) => {
    const file = e.target.files[0];
    const storageRef = app.storage().ref();
    const fileRef = storageRef.child(file.name);
    await fileRef.put(file);
    setFileUrl(await fileRef.getDownloadURL());
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    const imgname = e.target.imgname.value;
    if (!imgname || !fileUrl) {
      return;
    }

    await db.collection("users").doc(docId).collection("graphs").add({
      name: imgname,
      img: fileUrl
    });
  }

  useEffect(() => {
      console.log(docId);
    const fetchGraphs = async() => {
        if (docId) {
            const graphs = await db.collection("users").doc(docId).collection("graphs").get();
            setGraphs(graphs.docs.map((doc) => {
              return doc.data();
              })
            );
          }
    }
    fetchGraphs();
  }, [user, docId])


    return (
      <div className="wrapper">
        <><div className="header">
            <h1>Grafer och Diagram</h1>
            <ButtonToolbar className="custom-btn-toolbar">
            <LinkContainer to="/">
              <Button>Startsida</Button>
            </LinkContainer>
              <form onSubmit={onSubmit}>
                  <input type="file" onChange={onFileChange} />
                  <input type="text" name="imgname" placeholder="Name" />
                  <button>Submit</button>
                </form>
            </ButtonToolbar>
          </div>
          <div>
              <ul>
              {graphs.map((graph) => {
                return (
                  <li key={graph.name}>
                    <img width="500" height="500" src={graph.img} alt={graph.name} />
                    <p>{graph.name}</p>
                  </li>
                  );
                })}
              </ul>
              </div>
            </>
      </div>
    );
}

export default View;
