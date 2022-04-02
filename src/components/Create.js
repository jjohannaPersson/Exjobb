import React, { useState, useEffect } from "react";

import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import db from "../utils/firebase.config";

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
    const [users, setUsers] = useState([]);

    const fetchUsers = async() => {
        const response = db.collection('users');
        const data = await response.get();
        data.docs.forEach(element => {
            setUsers([...users, element.data()]);
            console.log(element.data());
        });
    }


    useEffect(() => {
        fetchUsers();
      }, [])

    if(jsonData) {

        // users.map(user => {
        //     return console.log(user.username)
        // })
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