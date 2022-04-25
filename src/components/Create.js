import React, { useState, useEffect } from "react";

import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import { LinkContainer } from 'react-router-bootstrap';
import Button from 'react-bootstrap/Button';
import { app } from "../utils/firebase.config";
import FileUpload from './FileUpload';
import Dropdown from "./Dropdown";
import SimpleBarChart from './SimpleBarChart';
import PieCharts from './PieChart';

const db = app.firestore();


const Create = (props) => {
    const { docId, current, folders } = props;
    const [file, setFile] = useState("");
    const [jsonData, setJsonData] = useState("");
    const [selectedGraph, setSelectedGraph] = useState("");
    const [selectedXAxes, setSelectedXAxes] = useState("");
    const [selectedYAxes, setSelectedYAxes] = useState("");
    const [users, setUsers] = useState([]);

    // const fetchUsers = async() => {
    //     const response = db.collection('users');
    //     const data = await response.get();
    //     data.docs.forEach(element => {
    //         setUsers([...users, element.data()]);
    //         console.log(element.data());
    //     });
    // };


    // useEffect(() => {
    //     fetchUsers();
    // }, []);

    if(jsonData) {
        if(selectedGraph == "Simple Bar Chart" && selectedXAxes && selectedYAxes) {
            return(
            <SimpleBarChart
            jsonData={jsonData}
            selectedXAxes={selectedXAxes} selectedYAxes={selectedYAxes}
            docId={docId} current={current} folders={folders}
            />
            )
        } else if (selectedGraph == "Pie Chart" && selectedXAxes) {
            console.log("Här");
            return(
            <PieCharts jsonData={jsonData} selectedXAxes={selectedXAxes}
            docId={docId} current={current} folders={folders}
            />
            )
        }
        return (
        <div className="header">
            <h1>Choose type of graph</h1>
            <Dropdown
            selectedGraph={selectedGraph} setSelectedGraph={setSelectedGraph}
            jsonData={jsonData} setJsonData={setJsonData}
            selectedXAxes={selectedXAxes} setSelectedXAxes={setSelectedXAxes}
            selectedYAxes={selectedYAxes} setSelectedYAxes={setSelectedYAxes}
            />
        </div>
        )
    }

    return (
        <div className="header">
            <h1>Upload file</h1>
            <ButtonToolbar className="custom-btn-toolbar">
                <FileUpload
                file={file} setFile={setFile}
                jsonData={jsonData} setJsonData={setJsonData}
                />
                <LinkContainer to="/">
                    <Button variant="outline-primary">Startsida</Button>
                </LinkContainer>
            </ButtonToolbar>
        </div>
    );
};

export default Create;
