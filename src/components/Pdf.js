import React, { useState } from "react";
import Button from 'react-bootstrap/Button';
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";


function Pdf(props) {
    const { title, setShow, setMessage } = props;

    const generatePDF = () => {
      if (!title) {
        console.error("Obs! Titel saknas");
        setMessage({type: "warning", title: "Ojdå, något gick fel.", text: "Titel saknas."})
        setShow(true);
        return;
      }
      html2canvas(document.querySelector('#graph')).then(function(canvas){

        const imgData = canvas.toDataURL("image/jpeg");

        const pdf = new jsPDF({
            orientation: "portrait", // landscape or portrait
            unit: "mm",
            format: "a4",
        });
        const imgProps = pdf.getImageProperties(imgData);
        const margin = 0.1;

        const pdfWidth = pdf.internal.pageSize.width * (1 - margin);
        const pdfHeight = pdf.internal.pageSize.height * (1 - margin);

        const x = pdf.internal.pageSize.width * (margin / 2);
        const y = pdf.internal.pageSize.height * (margin / 2);

        const widthRatio = pdfWidth / imgProps.width;
        const heightRatio = pdfHeight / imgProps.height;
        const ratio = Math.min(widthRatio, heightRatio);
        
        const w = imgProps.width * ratio;
        const h = imgProps.height * ratio;

        pdf.addImage(imgData, "JPEG", x, y, w, h);
        pdf.save(`${title}.pdf`);
    });
    }

    return (
        <>
        <Button onClick={generatePDF}>Skapa PDF</Button>
        </>
    )

}

export default Pdf;