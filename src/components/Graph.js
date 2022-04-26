import React, { useEffect, useState, useRef } from "react";
import { ButtonToolbar } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import { LinkContainer } from 'react-router-bootstrap';
import Pdf from "./Pdf";


function Graph(props) {
    const { docId, current, graphs } = props;
    const [image, setImage] = useState("");
    const [graphId, setGraphId] = useState("");
    const myContainer = useRef(null);

      useEffect(() => {
      const fetchGraph = async() => {
        let urlElements = window.location.href.split('/')
        let length = urlElements.length;
        let urlElement = urlElements[length - 1];
        setGraphId(decodeURI(urlElement));
        graphs.forEach(graph => {
          if (graphId === graph.id) {
            setImage(graph);
          }
        });
      }
      fetchGraph();
    }, [docId, graphId, graphs])

    return <>
    <h1>Översikt</h1>
    <section>
    <ButtonToolbar className="custom-btn-toolbar">
      <LinkContainer to={`/view/${current}`}>
        <Button variant="outline-primary">Tillbaka</Button>
      </LinkContainer>
    </ButtonToolbar>
    <div id="graph" ref={myContainer}>
    <img width="100%" src={image.img} alt={image.name} />
    </div>
    <Pdf title={image.name}/>
    </section>
    </>
}

export default Graph;