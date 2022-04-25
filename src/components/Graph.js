import React, { useEffect, useState, useRef } from "react";
import { ButtonToolbar } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import { LinkContainer } from 'react-router-bootstrap';
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";


function Graph(props) {
    const { docId, current, graphs } = props;
    // const [graphs, setGraphs] = useState([]);
    // const [current, setCurrent] = useState("");
    const [image, setImage] = useState("");
    const [graphId, setGraphId] = useState("");
    const myContainer = useRef(null);

      useEffect(() => {
      const fetchGraph = async() => {
        let urlElements = window.location.href.split('/')
        let length = urlElements.length;
        let urlElement = urlElements[length - 1];
        setGraphId(decodeURI(urlElement));
        graphs.forEach(graph => {
          if (graphId === graph.id) {
            setImage(graph);
          }
        });
      }
      fetchGraph();
    }, [docId, graphId])
    

    const generatePDF = () => {
      // const quality = 1 // Higher the better but larger file
      // html2canvas(document.querySelector('#html'),
      //     { scale: quality }
      // ).then(canvas => {
      //     const pdf = new jsPDF('l', 'mm', 'a4');
      //     pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, 211, 298);
      //     pdf.save(image.name);
      // });

      html2canvas(document.querySelector('#html')).then(function(canvas){
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
        pdf.save(`${image.name}.pdf`);
    });
    }

    useEffect(() => {
      console.log(myContainer.current);
    }, []);

    return <>
    <h1>{image.name}</h1>
    <section ref={myContainer}>
    <ButtonToolbar className="custom-btn-toolbar">
      <LinkContainer to={`/view/${current}`}>
        <Button variant="outline-primary">Tillbaka</Button>
      </LinkContainer>
    </ButtonToolbar>
    <div id="html">
    <img width="100%" src={image.img} alt={image.name} />
    </div>
    <Button onClick={generatePDF}>Skapa PDF</Button>
    </section>
    </>
}

export default Graph;