import React, { useState} from "react";
import './App.css';
import {
    HashRouter as Router,
    Routes as Switch,
    Route
} from "react-router-dom";
import Container from 'react-bootstrap/Container';

import BarCharts from './barChart.js';
import PieChart from './pieChart.js';
import SimpleBarCharts from './simpleBarChart.js';
import Home from './home.js';
import Examples from './examples.js';
import Create from './components/Create';
import View from './components/View';
import Folder from "./components/Folder";


function App() {
  const [docId, setDocId] = useState("");
  

  return (
    <Router>
        <Container className="p-3">
          <Container className="p-5 mb-4 bg-light rounded-3">
            <Switch>
                <Route path='/' element={<Home docId={docId} setDocId={setDocId}/>} />
                <Route path='/create' element={<Create/>} />
                <Route path='/example' element={<Examples/>} />
                <Route path='/view/*' element={<View docId={docId}/>} />
                <Route path="/view/:folder" element={<Folder docId={docId}/>}/>
                <Route path='/simple' element={<SimpleBarCharts/>} />
                <Route path='/bar' element={<BarCharts/>} />
                <Route path='/pie' element={<PieChart/>} />
            </Switch>
          </Container>
        </Container>
    </Router>
  );
};

export default App;
