import React, { useState } from "react";

import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import { LinkContainer } from 'react-router-bootstrap';
import Button from 'react-bootstrap/Button';
import FileUpload from './FileUpload';
import Dropdown from "./Dropdown";
import SimpleBarChart from './SimpleBarChart';
import PieCharts from './PieChart';


const Create = (props) => {
    const { docId, current, folders } = props;
    const [file, setFile] = useState("");
    const [jsonData, setJsonData] = useState("");
    const [selectedGraph, setSelectedGraph] = useState("");
    const [selectedXAxes, setSelectedXAxes] = useState("");
    const [selectedYAxes, setSelectedYAxes] = useState("");

    if(jsonData) {
        if(selectedXAxes && selectedYAxes) {
            if(selectedGraph === "Simple Bar Chart") {
                return(
                <SimpleBarChart
                jsonData={jsonData}
                selectedXAxes={selectedXAxes} selectedYAxes={selectedYAxes}
                docId={docId} current={current} folders={folders}
                />
                )
            } else if (selectedGraph === "Bar Chart") {
                console.log("Här");
                return(
                <PieCharts jsonData={jsonData} selectedXAxes={selectedXAxes} selectedYAxes={selectedYAxes}
                docId={docId} current={current} folders={folders}
                />
                )
            }
        }
        return (
        <div className="header">
            <h1>Välj typ av graf</h1>
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
            <h1>Ladda upp fil</h1>
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
