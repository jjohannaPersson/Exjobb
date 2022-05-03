import React, { useRef } from "react";
import Button from 'react-bootstrap/Button';
// import * as XLSX from "xlsx";
const XLSX = await import('xlsx');


const FileUpload = (props) => {
  const inputFile = useRef(null);

  const handleFileUpload = e => {
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
            for (var i=0; i<json.length; i++) {
                json[i].Index = Math.round(json[i].Index)
            }
            props.setJsonData(json);
        };
        props.setFile(file);
        reader.readAsArrayBuffer(file);
    }
  };

  const onButtonClick = () => {
    inputFile.current.click();
  };

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
        Välj fil
      </Button>
    </div>
  );
};

export default FileUpload;
