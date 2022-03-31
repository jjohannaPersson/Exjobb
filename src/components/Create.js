import React, { useState } from "react";

import ButtonToolbar from 'react-bootstrap/ButtonToolbar';

import FileUpload from './FileUpload';
import Dropdown from "./Dropdown";
import SimpleBarChart from './SimpleBarChart';


const Create = () => {
    const [file, setFile] = useState("");
    const [jsonData, setJsonData] = useState("");
    const [selectedGraph, setSelectedGraph] = useState("");
    const [selectedXAxes, setSelectedXAxes] = useState("");
    const [selectedYAxes, setSelectedYAxes] = useState("");

    if(jsonData) {
        if(selectedXAxes && selectedYAxes) {
            console.log("är inuti");
            return(
            <SimpleBarChart jsonData={jsonData} selectedXAxes={selectedXAxes} selectedYAxes={selectedYAxes}/>
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
            </ButtonToolbar>
        </div>
    );
};

export default Create;
