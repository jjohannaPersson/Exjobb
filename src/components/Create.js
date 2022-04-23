import React, { useState, useEffect } from "react";

import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import { LinkContainer } from 'react-router-bootstrap';
import Button from 'react-bootstrap/Button';

import FileUpload from './FileUpload';
import Dropdown from "./Dropdown";
import SimpleBarChart from './SimpleBarChart';
import BarChartThree from './BarChart';
import db from '../utils/firebase.config.js';


const Create = () => {
    const [file, setFile] = useState("");
    const [jsonData, setJsonData] = useState("");
    const [selectedGraph, setSelectedGraph] = useState("");
    const [selectedXAxes, setSelectedXAxes] = useState("");
    const [selectedYAxes, setSelectedYAxes] = useState("");
    const [users, setUsers] = useState([]);

    const fetchUsers = async() => {
        const response = db.collection('users');
        const data = await response.get();
        data.docs.forEach(element => {
            setUsers([...users, element.data()]);
            console.log(element.data());
        });
    };


    useEffect(() => {
        fetchUsers();
    }, []);

    if(jsonData) {
        if(selectedXAxes && selectedYAxes) {
            if(selectedGraph == "Simple Bar Chart") {
                return(
                <SimpleBarChart jsonData={jsonData} selectedXAxes={selectedXAxes} selectedYAxes={selectedYAxes}/>
                )
            } else if (selectedGraph == "Bar Chart") {
                console.log("Här");
                return(
                <BarChartThree jsonData={jsonData} selectedXAxes={selectedXAxes} selectedYAxes={selectedYAxes}/>
                )
            }
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
