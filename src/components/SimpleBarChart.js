import React, { useRef, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  LabelList
} from "recharts";
import { LinkContainer } from 'react-router-bootstrap';
import { Button } from "react-bootstrap";
import { InputGroup } from "react-bootstrap";
import { Form } from "react-bootstrap";
import html2canvas from "html2canvas";
import { Rnd } from 'react-rnd';
import NewFolderForm from "./NewFolderForm";
import Pdf from "./Pdf";
import { app } from "../utils/firebase.config";
import AlertBox from "./Alert";
import ContentEditable from 'react-contenteditable'

const db = app.firestore();

const SimpleBarChart = (props) => {
    const { docId, folders } = props;

    const myContainer = useRef(null);
    const titleInput = useRef();
    const textInput = useRef("");

    const [title, setTitle] = useState("");
    const [selectedFolder, setSelectedFolder] = useState("");
    const [isActive, setActive] = useState("false");
    const [show, setShow] = useState(false);
    const [message, setMessage] = useState({
      type: "",
      title: "",
      text: ""
    })


  // save image to database
  const onSubmit = async (e) => {

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

    const updateTitle = () => {
      setTitle(titleInput.current.value);
    };

    const toggleTextArea = () => {
      setActive(!isActive);
    };

    const onClientChange = (e) => {
      setSelectedFolder(e.target.value);
    };

    const handleChange = evt => {
      textInput.current = evt.target.value;
  };



    // console.log(props.selectedYAxes);

    return (
      <>
        <div className="content" id="graph" ref={myContainer}>
        <h1>{title}</h1>
        <div className="bar">
            <BarChart
              width={1200}
              height={500}
              data={props.jsonData}
              margin={{
                top: 5,
                right: 70,
                left: 20,
                bottom: 60
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey={props.selectedXAxes} height={100} textAnchor= "end" sclaeToFit="true" verticalAnchor= "start"  interval={0} angle= "-40" stroke="#8884d8" label={{ value: props.selectedXAxes, position: "bottom", offset: 20 }}/>
              <YAxis label={{ value: props.selectedYAxes, position: "insideLeft", offset: -20 }} />
              <Tooltip />

              <Bar dataKey={props.selectedYAxes} fill="#8884d890">
              <LabelList dataKey={props.selectedYAxes} position="top"/>
              </Bar>
            </BarChart>
        </div>
        <Rnd
          default={{
            x: 150,
            y: 205,
            width: 300,
            height: 200,
          }}
          minWidth={100}
          minHeight={50}
          bounds="window"
        >
          <ContentEditable
          onChange={handleChange}
          html={textInput.current}
          className="text-box"
          style={isActive ? {"display": "none"} : {"display": "block"}}
          />
        </Rnd>
        </div>
        <AlertBox
            message={message}
            show={show} setShow={setShow}
            />
        <Form.Label>Titel</Form.Label>
        <InputGroup className="mb-3">
            <Form.Control
              type="text" placeholder="Titel"
              ref={titleInput}
            />
            <Button variant="outline-secondary" id="button-addon2" onClick={updateTitle}>
              Uppdatera titel
            </Button>
          </InputGroup>
          <Button variant="outline-secondary" onClick={toggleTextArea}>
              {isActive ? "Lägg till textruta" : "Ta bort textruta"}
            </Button>

          <Form.Select aria-label="Default select example"
          onChange={onClientChange}
          >
          <option>Välj kund</option>
          {folders.map((folder) => {
                  return (
                      <option key={Date.now() + Math.random()} value={folder.name}>{folder.name}</option>
                    );
                  })}
        </Form.Select>
        <NewFolderForm
            docId={docId}
            setMessage={setMessage} setShow={setShow}/>
        <Button onClick={onSubmit}>Spara bild</Button>
        <Pdf 
        title={title}
        setMessage={setMessage} setShow={setShow}
        />
        <LinkContainer to="/">
                <Button variant="outline-primary">Startsida</Button>
        </LinkContainer>
      </>
      );
}

export default SimpleBarChart;
