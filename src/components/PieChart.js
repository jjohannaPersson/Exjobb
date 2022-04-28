import React, { useCallback, useState, useRef, useEffect } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { Link } from "react-router-dom";
import { LinkContainer } from 'react-router-bootstrap';
import { Button } from "react-bootstrap";
import { InputGroup } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { DropdownButton } from 'react-bootstrap';
import DropdownItem from 'react-bootstrap/esm/DropdownItem';
import { jsPDF } from "jspdf";
import * as htmlToImage from 'html-to-image';
import Draggable from "react-draggable";
import Rnd from 'react-rnd';
import { app } from "../utils/firebase.config";

const db = app.firestore();

const COLORS = ["#0088FE", "#00C49F", "#FF333D", "#FFBB28", "#FF8042", "#BF14C4"];

function PieCharts(props) {
    const { docId, current, folders } = props;
    const myContainer = useRef(null);
    const [fileUrl, setFileUrl] = useState(null);
    const [title, setTitle] = useState("");
    const [text, setText] = useState("");
    const [tempTitle, setTempTitle] = useState("Titel");
    const [selectedFolder, setSelectedFolder] = useState("");

    htmlToImage.toPng(myContainer.current)
    .then(function (dataUrl) {
      var img = new Image();
      img.src = dataUrl;
      // document.body.appendChild(img);
      setFileUrl(dataUrl);
    })
    .catch(function (error) {
      console.error('oops, something went wrong!', error);
    });

    // save iage to database
  const onSubmit = async (e) => {
    e.preventDefault()

    // set imgname
    const imgname = "test";
    if (!title || !selectedFolder || !fileUrl) {
      console.error('oops, something went wrong!');
      return;
    }
    // remove hard coded docId and current client
    await db.collection("users").doc(docId).collection("folders").doc(selectedFolder).collection("graphs").add({
      name: title,
      img: fileUrl
    });
  }

    const generatePDF = () => {

      const report = new jsPDF('portrait','pt','a4');
      report.html(myContainer.current).then(() => {
          report.save('graph.pdf');
      });
    }

    useEffect(() => {
      console.log(myContainer.current);
      console.log(current, docId, folders);
    }, [docId]);

    const onTitleChange = (e) => {
      setTempTitle(e.target.value);
    };

    const updateTitle = () => {
      setTitle(tempTitle);
    };

    const onClientChange = (e) => {
      setSelectedFolder(e.target.value);
    };

    console.log(props.jsonData[0]);

    return (
        <>
        <div class="content" id="graph" ref={myContainer}>
            <h1>{title}</h1>
            <div className="pie">
                <PieChart  width={600} height={400}>
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
        </div>
        <InputGroup className="mb-3">
            <Form.Control
              type="text" placeholder="Titel"
              value={tempTitle}
              onChange={onTitleChange}
            />
            <Button variant="outline-secondary" id="button-addon2" onClick={updateTitle}>
              Uppdatera titel
            </Button>
          </InputGroup>
          <Form.Select aria-label="Default select example"
          onChange={onClientChange}
          >
          <option>Välj kund</option>
          {folders.map((folder) => {
                  return (
                      <option value={folder.name}>{folder.name}</option>
                    );
                  })}
        </Form.Select>
        <Button onClick={onSubmit}>Spara bild</Button>
        <LinkContainer to="/">
                <Button variant="outline-primary">Startsida</Button>
        </LinkContainer>
        </>
    );
}

export default PieCharts;
