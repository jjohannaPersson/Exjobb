import React, { useEffect, useState } from "react";
import { app } from "../utils/firebase.config";
import Button from 'react-bootstrap/Button';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import { LinkContainer } from 'react-router-bootstrap';
import NewFolderForm from "./NewFolderForm";
import AlertBox from "./Alert";

const db = app.firestore();

function View(props) {
    const { docId } = props;
    const [folders, setFolders] = useState([]);
    const [show, setShow] = useState(false);
    const [message, setMessage] = useState({
      type: "",
      title: "",
      text: ""
    })

  useEffect(() => {
    if (docId) {
      const unmount = db.collection("users").doc(docId).collection("folders").onSnapshot((snapshot) => {
        const tempFolders = [];
        snapshot.forEach((doc) => {
          tempFolders.push({ ...doc.data(), id: doc.id });
        });
        setFolders(tempFolders);
      });
      return unmount;
    }
  },[docId]);

    return (
      <div className="wrapper">
        <><div className="header">
            <h1>Kunder</h1>
            <ButtonToolbar className="custom-btn-toolbar">
              <LinkContainer to="/">
                <Button variant="outline-primary">Startsida</Button>
              </LinkContainer>
              <section>
                  {folders.map((folder) => {
                  return (
                      <span key={folder.id}>
                      <LinkContainer to={`/view/${folder.name}`}>
                      <Button>{folder.name}</Button>
                      </LinkContainer>
                      </span>
                    );
                  })}
              </section>
              <section className="new-section">
              <AlertBox
            message={message}
            show={show} setShow={setShow}
            />
            <NewFolderForm
            docId={docId}
            setMessage={setMessage} setShow={setShow}
            />
              </section>
            </ButtonToolbar>
          </div>
            </>
      </div>
    );
}

export default View;
