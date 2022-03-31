import React, { useRef } from "react";
import * as XLSX from "xlsx";

import Button from 'react-bootstrap/Button';

const FileUpload = (props) => {
  const inputFile = useRef(null);

  const handleFileUpload = e => {
    // const { files } = e.target;
    // if (files && files.length) {
    //   const filename = files[0].name;

    //   var parts = filename.split(".");
    //   const fileType = parts[parts.length - 1];
    //   console.log("fileType", fileType); //ex: zip, rar, jpg, svg etc.

    //   setFile(files[0]);

    // const [file] = e.target.files;
    // const reader = new FileReader();

    // reader.onload = (evt) => {
    //   const bstr = evt.target.result;
    //   const wb = XLSX.read(bstr, { type: "binary" });
    //   const wsname = wb.SheetNames[0];
    //   const ws = wb.Sheets[wsname];
    //   const data = XLSX.utils.sheet_to_csv(ws, { header: 1 });
    //   console.log(data);
    // };
    // reader.readAsBinaryString(file);
    // setFile(file);
    e.preventDefault();
    if (e.target.files) {
        const [file] = e.target.files;
        const reader = new FileReader();
        reader.onload = (e) => {
            const data = e.target.result;
            const workbook = XLSX.read(data, { type: "array" });
            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];
            const json = XLSX.utils.sheet_to_json(worksheet);
            console.log(json);
            props.setJsonData(json);
            // console.log(Object.keys(props.jsonData[0]))
        };
        props.setFile(file);
        reader.readAsArrayBuffer(file);
    }
  };

  const onButtonClick = () => {
    inputFile.current.click();
  };

//   console.log("File", props.file);
  return (
    <div>
      <input
        style={{ display: "none" }}
        // accept=".zip,.rar"
        ref={inputFile}
        onChange={handleFileUpload}
        type="file"
      />
      <Button onClick={onButtonClick}>
        Choose File
      </Button>
    </div>
  );
};

export default FileUpload;
