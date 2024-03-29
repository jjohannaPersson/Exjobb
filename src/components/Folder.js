import React, { useEffect } from "react";
import { ButtonToolbar } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import { LinkContainer } from 'react-router-bootstrap';
import { app } from "../utils/firebase.config";
// import GraphUpload from "./GraphUpload";
// import AlertBox from "./Alert";

const db = app.firestore();

function Folder(props) {
    const { docId, current, setCurrent, graphs, setGraphs } = props;
    // const [image, setImage] = useState("");
    // const [show, setShow] = useState(false);
    // const [message, setMessage] = useState({
    //   type: "",
    //   title: "",
    //   text: ""
    // })

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
    }, [docId, current, setCurrent, setGraphs])

    if (graphs.length === 0) {
      return <>
      <h1>{current}</h1>
      <section>
      <ButtonToolbar className="custom-btn-toolbar">
        <LinkContainer to="/view">
          <Button variant="outline-primary">Tillbaka</Button>
        </LinkContainer>
        <section className="new-section">
        </section>
      </ButtonToolbar>
      <div className="images">
      <p>Mappen är tom</p>
      </div>
      </section>
      </>
    }
    return <>
    <h1>{current}</h1>
    <section>
    <ButtonToolbar className="custom-btn-toolbar">
      <LinkContainer to="/view">
        <Button variant="outline-primary">Tillbaka</Button>
      </LinkContainer>
      <section className="new-section">
      </section>
    </ButtonToolbar>
    <div className="images">
      {graphs.map((graph) => {
        return (
          <LinkContainer key={Date.now() + Math.random()} to={`/view/${current}/${graph.id}`}>
          {/* <span className="img-container" key={Date.now() + Math.random()}> */}
            <img width="auto" height="280" key={Date.now() + Math.random()} src={graph.img} alt={graph.name} />
          {/* </span> */}
          </LinkContainer>
          );
        })}
    </div>
    </section>
    </>
}

export default Folder;