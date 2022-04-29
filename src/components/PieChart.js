import React, { useState, useRef } from "react";
import { PieChart, Pie, Cell } from "recharts";

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

const COLORS = ["#0088FE", "#00C49F", "#FF333D", "#FFBB28", "#FF8042", "#BF14C4"];

function PieCharts(props) {
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

    // console.log(props.jsonData[0]);

    return (
        <>
        <div className="div-content" id="graph" ref={myContainer}>
            <h1>{title}</h1>
            <div className="pie">
                <PieChart width={1170} height={400}>
                  <Pie
                    data={props.jsonData}
                    cx='50%'
                    cy='50%'
                    labelLine={true}
                    label={({
                      cx,
                      cy,
                      midAngle,
                      innerRadius,
                      outerRadius,
                      value,
                      index
                    }) => {
                      const RADIAN = Math.PI / 180;
                      const radius = 25 + innerRadius + (outerRadius - innerRadius);
                      const x = cx + radius * Math.cos(-midAngle * RADIAN);
                      const y = cy + radius * Math.sin(-midAngle * RADIAN);
                      return (
                        <text
                          x={x}
                          y={y}
                          fill={COLORS[index % COLORS.length]}
                          textAnchor={x > cx ? "start" : "end"}
                          dominantBaseline="central"
                        >
                          {props.jsonData[index][props.selectedYAxes]} ({value})
                        </text>
                      );
                    }}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey={props.selectedXAxes}
                  >
                    {props.jsonData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                </PieChart>
            </div>
        <Textbox textInput={textInput} isActive={isActive}/>
        <Description descriptionInput={descriptionInput} isVisible={isVisible} />
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

export default PieCharts;
