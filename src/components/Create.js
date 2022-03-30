import React, { useState } from "react";

import ButtonToolbar from 'react-bootstrap/ButtonToolbar';

import FileUpload from './FileUpload';
import Dropdown from "./Dropdown";


const Create = () => {
    const [file, setFile] = useState("");
    const [jsonData, setJsonData] = useState("");
    const [selectedGraph, setSelectedGraph] = useState("");
    const [selectedAxes, setSelectedAxes] = useState({
        x: "",
        y: ""
    });

    if(jsonData) {
        return (
        <div className="header">
            <h1>Choose type of graph</h1>
            <Dropdown
            selectedGraph={selectedGraph} setSelectedGraph={setSelectedGraph}
            jsonData={jsonData} setJsonData={setJsonData}
            selectedAxes={selectedAxes} setSelectedAxes={setSelectedAxes}
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
