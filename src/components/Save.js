import React from "react";
import Button from 'react-bootstrap/Button';
import { app } from "../utils/firebase.config";
import html2canvas from "html2canvas";

const db = app.firestore();


function Save(props) {
    const { title, setShow, setMessage, docId, selectedFolder, setSelectedFolder } = props;

  // save image to database, create component?
  const saveImage = async (e) => {

    function addGraph(url) {
      if (!title || !selectedFolder || selectedFolder === "Välj kund") {
        console.error('oops, missing title or folder!');
        setMessage({type: "warning", title: "Ojdå, något gick fel.", text: "Titel eller kund saknas."})
        setShow(true);
        return;
      }
      try {
        db.collection("users").doc(docId).collection("folders").doc(selectedFolder).collection("graphs").add({
          name: title,
          img: url
        });
        console.info("img added to db");
        setMessage({type: "success", title: "Allt gick bra!", text: 'Grafen har sparats i databasen.'})
        setShow(true);
        setSelectedFolder("");
      } catch (e) {
        console.error(e);
      }
    }

    e.preventDefault();

    await html2canvas(document.querySelector('#graph'))
    .then(function(canvas) {

      const imgData = canvas.toDataURL("image/jpeg");

      addGraph(imgData);
    })
    .catch(function (error) {
      console.error('oops, something went wrong!', error);
    });
  ;
  }

    return (
        <>
        <Button onClick={saveImage}>Spara bild</Button>
        </>
    )

}

export default Save;