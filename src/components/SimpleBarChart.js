import React, { useRef, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  LabelList,
  ResponsiveContainer
} from "recharts";

import { LinkContainer } from 'react-router-bootstrap';
import { Button } from "react-bootstrap";
import { InputGroup } from "react-bootstrap";
import { Form } from "react-bootstrap";

import NewFolderForm from "./NewFolderForm";
import Save from "./Save";
import Pdf from "./Pdf";
import AlertBox from "./Alert";
import Textbox from "./Textbox";
import Description from "./Description";

const SimpleBarChart = (props) => {
    const { docId, folders } = props;

    const myContainer = useRef(null);
    const titleInput = useRef();
    const textInput = useRef("");
    const descriptionInput = useRef("");

    const [title, setTitle] = useState("");
    const [selectedFolder, setSelectedFolder] = useState("");
    const [isActive, setActive] = useState("false");
    const [isVisible, setVisible] = useState("false");
    const [show, setShow] = useState(false);
    const [message, setMessage] = useState({
      type: "",
      title: "",
      text: ""
    })
    const currentGraph = "bar";

    const updateTitle = () => {
      setTitle(titleInput.current.value);
    };

    const toggleTextArea = () => {
      setActive(!isActive);
    };

    const toggleDescription = () => {
      setVisible(!isVisible);
    };

    const onClientChange = (e) => {
      setSelectedFolder(e.target.value);
    };

    return (
      <>
        <div className="content" id="graph" ref={myContainer}>
        <h1>{title}</h1>
        <div className="bar">
        <ResponsiveContainer widht="90%" height="90%">
            <BarChart
              data={props.jsonData}
              margin={{
                top: 5,
                right: 70,
                left: 20,
                bottom: 60
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey={props.selectedXAxes} height={100} textAnchor= "start" sclaeToFit="true" verticalAnchor= "start"  interval={0} angle= "40" stroke="#8884d8" label={{ value: props.selectedXAxes, position: "bottom", offset: 35 }}/>
              <YAxis label={{ value: props.selectedYAxes, position: "insideLeft", offset: -20 }} />
              <Tooltip />

              <Bar dataKey={props.selectedYAxes} fill="#8884d890">
              <LabelList dataKey={props.selectedYAxes} position="top"/>
              </Bar>
            </BarChart>
            </ResponsiveContainer>
        </div>
        <Textbox textInput={textInput} isActive={isActive} currentGraph={currentGraph}/>
        <Description descriptionInput={descriptionInput} isVisible={isVisible} currentGraph={currentGraph}/>
        </div>
        <p className="custom-label" style={isVisible ? {"visibility": "hidden"} : {"display": "block"}}>Beskrivning</p>
        <AlertBox
            message={message}
            show={show} setShow={setShow}
            />
        <div className="edit-container">
          <div className="edit-text">
        <Form.Label>Lägg till rubrik</Form.Label>
        <InputGroup className="mb-3">
            <Form.Control
              type="text" placeholder="Rubrik"
              ref={titleInput}
            />
            <Button variant="outline-secondary" id="button-addon2" onClick={updateTitle}>
              Uppdatera rubrik
            </Button>
          </InputGroup>
          <Button variant="outline-secondary" onClick={toggleDescription}>
              {isVisible ? "Lägg till beskrivning" : "Ta bort beskrivning"}
          </Button>

          <Button variant="outline-secondary" onClick={toggleTextArea}>
              {isActive ? "Lägg till textruta" : "Ta bort textruta"}
            </Button>
            </div>
          <Form.Label>Välj kund för att spara graf</Form.Label>
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
        <Save
        docId={docId}
        selectedFolder={selectedFolder}
        title={title}
        setMessage={setMessage} setShow={setShow}
        setSelectedFolder={setSelectedFolder}
        />
        <Pdf
        title={title}
        setMessage={setMessage} setShow={setShow}
        />
        <LinkContainer to="/">
                <Button variant="outline-primary">Startsida</Button>
        </LinkContainer>
        </div>
      </>
      );
}

export default SimpleBarChart;
