import React, { useRef, useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LabelList
} from "recharts";
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



// const data = [
//     {
//     name: '-',
//     index: 2,
//     },
//     {
//     name: '0 - 50.000 kr',
//     index: 44,
//     },
//     {
//     name: '50.000 - 100.000 kr',
//     index: 65,
//     },
//     {
//     name: '100.000 - 150.000 kr',
//     index: 86,
//     },
//     {
//     name: '150.000 - 200.000 kr',
//     index: 96,
//     },
//     {
//     name: '200.000 - 300.000 kr',
//     index: 101,
//     },
//     {
//     name: '300.000 - 400.000 kr',
//     index: 105,
//     },
//     {
//     name: '400.000 - 500.000 kr',
//     index: 117,
//     },
//     {
//     name: '500.000 - 600.000 kr',
//     index: 128,
//     },
//     {
//     name: '600.000 - 700.000 kr',
//     index: 142,
//     },
//     {
//     name: '700.000 - 800.000 kr',
//     index: 151,
//     },
//     {
//     name: '800.000 - 900.000 kr',
//     index: 157,
//     },
//     {
//     name: '900.000 - 1.000.000 kr',
//     index: 166,
//     },
//     {
//     name: '1.000.000 - 1.500.000 kr',
//     index: 178,
//     },
//     {
//     name: '1.500.000 - 2.000.000 kr',
//     index: 210,
//     },
//     {
//     name: '2.000.000 - 3.000.000 kr',
//     index: 227,
//     },
//     {
//     name: '3.000.000 - 4.000.000 kr',
//     index: 261,
//     },
//     {
//     name: '4.000.000 - 5.000.000 kr',
//     index: 264,
//     },
//     {
//     name: '5.000.000 kr',
//     index: 262,
//     },
// ];


const SimpleBarChart = (props) => {
    const { docId, current, folders } = props;
    const myContainer = useRef(null);
    const [fileUrl, setFileUrl] = useState(null);
    const [title, setTitle] = useState("");
    const [text, setText] = useState("");
    const [tempTitle, setTempTitle] = useState("Titel");
    const [selectedFolder, setSelectedFolder] = useState("");

    // let node = document.getElementById('graph');

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


    console.log(props.selectedYAxes);

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
        </div>
        {/* <Draggable>
        <div>
            <Form.Control
              as="textarea" placeholder="Textruta"
            />
        </div>
        </Draggable>
            <Button variant="outline-secondary" id="button-addon2" onClick={updateText}>
              Uppdatera textruta
            </Button> */}

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

export default SimpleBarChart;
