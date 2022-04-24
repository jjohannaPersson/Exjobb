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
import Graph from "./components/Graph";


function App() {
  const [docId, setDocId] = useState("");
  const [current, setCurrent] = useState("");
  const [folders, setFolders] = useState([]);
  const [graphs, setGraphs] = useState([]);

  

  return (
    <Router>
        <Container className="p-3">
          <Container className="p-5 mb-4 bg-light rounded-3">
            <Switch>
                <Route path='/' element={<Home docId={docId} setDocId={setDocId} folders={folders} setFolders={setFolders}/>} />
                <Route path='/create' element={<Create docId={docId} current={current} folders={folders}/>} />
                <Route path='/example' element={<Examples/>} />
                <Route path='/view/*' element={<View docId={docId} />} />
                <Route path="/view/:folder" element={<Folder docId={docId} current={current} setCurrent={setCurrent} graphs={graphs} setGraphs={setGraphs}/>}/>
                <Route path="/view/:folder/:graph" element={<Graph docId={docId} current={current} graphs={graphs}/>}/>
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
