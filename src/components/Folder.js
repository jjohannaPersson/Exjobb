import React, { useEffect, useState } from "react";
import { ButtonToolbar } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import { LinkContainer } from 'react-router-bootstrap';
import { app } from "../utils/firebase.config";
import GraphUpload from "./GraphUpload";

const db = app.firestore();

function Folder(props) {
    const { docId, current, setCurrent, graphs, setGraphs } = props;
    // const [graphs, setGraphs] = useState([]);
    // const [current, setCurrent] = useState("");
    const [image, setImage] = useState("");

      useEffect(() => {
      const fetchGraphs = async() => {
        let urlElements = window.location.href.split('/')
        let length = urlElements.length;
        let urlElement = urlElements[length - 1];
        setCurrent(decodeURI(urlElement));
          if (docId && current) {
              const unmount = db.collection("users").doc(docId).collection("folders").doc(current).collection("graphs").onSnapshot((snapshot) => {
                const tempGraphs = [];
                snapshot.forEach((doc) => {
                  tempGraphs.push({ ...doc.data(), id: doc.id });
                });
                setGraphs(tempGraphs);
              });
              return unmount;
            }
      }
      fetchGraphs();
    }, [docId, current, image, setCurrent])

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
          <LinkContainer to={`/view/${current}/${graph.id}`}>
          <li key={Date.now() + Math.random()}>
            <img width="400" src={graph.img} alt={graph.name} />
            <p>{graph.name}</p>
          </li>
          </LinkContainer>
          );
        })}
      </ul>
    </div>
    </section>
    </>
}

export default Folder;