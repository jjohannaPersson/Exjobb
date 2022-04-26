import React, { useState } from "react";
import Button from 'react-bootstrap/Button';
import { Form } from "react-bootstrap";
import { FormControl } from "react-bootstrap";
import { InputGroup } from "react-bootstrap";
import { app } from "../utils/firebase.config";

const db = app.firestore();

function GraphUpload(props) {
    const { docId, current, setImage, setShow, setMessage } = props;
    const [fileUrl, setFileUrl] = useState(null);

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
          setMessage({type: "warning", title: "Ojdå, något gick fel.", text: "Namn eller vald fil saknas."})
          setShow(true);
          return;
        }
    
        await db.collection("users").doc(docId).collection("folders").doc(current).collection("graphs").add({
          name: imgname,
          img: fileUrl
        });
        setMessage({type: "success", title: "Allt gick bra!", text: 'Bilden har sparats i databasen.'})
        setShow(true);
        setImage(imgname);
      }

    return <>
    <Form onSubmit={onSubmit}>
      <Form.Group controlId="formFile" className="mb-3">
      <Form.Label>Ladda upp fil</Form.Label>
      <Form.Control type="file" onChange={onFileChange}/>
      </Form.Group>
      <Form.Label>Namn</Form.Label>
      <InputGroup className="mb-3">
        <FormControl
          placeholder="Namn"
          aria-label="Name"
          aria-describedby="basic-addon2"
          type="text"
          name="imgname"
        />
        <Button variant="outline-secondary" id="button-addon2" type="submit">
          Ladda upp
        </Button>
      </InputGroup>
    </Form>
    </>
}

export default GraphUpload;