import React, { useState } from "react";
import { app } from "../utils/firebase.config";
import Button from 'react-bootstrap/Button';
import { InputGroup } from "react-bootstrap";
import { FormControl } from "react-bootstrap";
import { Form } from "react-bootstrap";
const db = app.firestore();

function NewFolderForm(props) {
    const { docId, setShow, setMessage } = props;
    const [ folderName, setFolderName ] = useState("");

    const onFolderNameChange = (e) => {
        setFolderName(e.target.value);
      };
    
      const onFolderCreate = () => {
        if (!folderName) {
          setMessage({type: "warning", title: "Ojdå, något gick fel.", text: "Kundnamn saknas."})
          setShow(true);
          return;
        }
        db.collection("users").doc(docId).collection("folders").doc(folderName).set({
          name: folderName,
        });
        setMessage({type: "success", title: "Allt gick bra!", text: 'Kunden har sparats i databasen.'})
        setShow(true);
        setFolderName("");
      };
    return (
        <>

        <Form.Label>Ny kund</Form.Label>
            <InputGroup className="mb-3">
            <FormControl
              placeholder="Ny kund"
              aria-label="Ny kund"
              aria-describedby="basic-addon2"
              value={folderName}
              onChange={onFolderNameChange}
            />
            <Button variant="outline-secondary" id="button-addon2" onClick={onFolderCreate}>
              Skapa mapp
            </Button>
          </InputGroup>
        </>
    )

}

export default NewFolderForm;