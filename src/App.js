import React from "react";
import './App.css';
import {
    HashRouter as Router,
    Routes as Switch,
    Route
} from "react-router-dom";
import Container from 'react-bootstrap/Container';

import BarCharts from './barChart.js';
import PieChart from './pieChart.js';
import SimpleBarChart from './simpleBarChart.js';
import Home from './home.js';
import Examples from './examples.js';
import Create from './components/Create';


const App = () => (
    <Router>
        <Container className="p-3">
          <Container className="p-5 mb-4 bg-light rounded-3">
            <Switch>
                <Route path='/' element={<Home/>} />
                <Route path='/create' element={<Create/>} />
                <Route path='/view' element={<Examples/>} />
                <Route path='/simple' element={<SimpleBarChart/>} />
                <Route path='/bar' element={<BarCharts/>} />
                <Route path='/pie' element={<PieChart/>} />
            </Switch>
          </Container>
        </Container>
    </Router>
);

export default App;
