import React, { useEffect, useState } from "react";
import { ButtonToolbar } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import { LinkContainer } from 'react-router-bootstrap';
import { app } from "../utils/firebase.config";
import GraphUpload from "./GraphUpload";

const db = app.firestore();

function Folder(props) {
    const { docId } = props;
    const [graphs, setGraphs] = useState([]);
    const [current, setCurrent] = useState("");
    const [image, setImage] = useState("");

      useEffect(() => {
      const fetchGraphs = async() => {
        let urlElements = window.location.href.split('/')
        let length = urlElements.length;
        let urlElement = urlElements[length - 1];
        setCurrent(decodeURI(urlElement));
          if (docId && current) {
              const graphs = await db.collection("users").doc(docId).collection("folders").doc(current).collection("graphs").get();
              setGraphs(graphs.docs.map((doc) => {
                  // console.log(doc.data());
                return doc.data();
                })
              );
            }
      }
      fetchGraphs();
    }, [docId, current, image])

    return <>
    <h1>{current}</h1>
    <section>
    <ButtonToolbar className="custom-btn-toolbar">
      <LinkContainer to="/view">
        <Button variant="outline-primary">Tillbaka</Button>
      </LinkContainer>
      <GraphUpload docId={docId} current={current} setImage={setImage} />
    </ButtonToolbar>
    <div>
      <ul style={{ listStyleType: "none", padding: 0}}>
      {graphs.map((graph) => {
        return (
          <li key={graph.name}>
            <img width="400" src={graph.img} alt={graph.name} />
            <p>{graph.name}</p>
          </li>
          );
        })}
      </ul>
    </div>
    </section>
    </>
}

export default Folder;