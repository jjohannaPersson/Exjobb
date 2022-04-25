import React, { useState } from 'react';

import { DropdownButton } from 'react-bootstrap';
import DropdownItem from 'react-bootstrap/esm/DropdownItem';

const Dropdown = (props) => {
    let typesOfGraphs = ["Simple Bar Chart", "Pie Chart"];
    const [xTitle, setxTitle]=useState('Select X-axes');
    const [yTitle, setyTitle]=useState('Select Y-axes');
    let titles;

    if (props.jsonData) {
        titles = Object.keys(props.jsonData[0]);
    }

    if (!props.selectedGraph) {
        return (
            <>
                <DropdownButton id="dropdown-basic-button" title="Select graph">
                {typesOfGraphs.map((graph) => {
                        return (
                            <DropdownItem key={Date.now() + Math.random()} onClick={e => {
                                console.log(`Choosen graph: ${graph}`);
                                props.setSelectedGraph(graph);
                            }} >{graph}
                            </DropdownItem>
                        );
                    })}
                </DropdownButton>
            </>
        );
    }
    switch(props.selectedGraph) {
        case "Simple Bar Chart":
            return (
                <>
                    <DropdownButton id="dropdown-basic-button" title={xTitle} >
                    {titles.map((title) => {
                            return (
                                <DropdownItem key={Date.now() + Math.random()} onClick={e => {
                                    setxTitle(title);
                                    console.log(`Choosen value for X-axes: ${title}`);
                                    props.setSelectedXAxes(title);
                                }} >{title}
                                </DropdownItem>
                            );
                        })}
                    </DropdownButton>
                    <DropdownButton id="dropdown-basic-button" title={yTitle}>
                    {titles.map((title) => {
                            return (
                                <DropdownItem key={Date.now() + Math.random()} onClick={e => {
                                    setyTitle(title);;
                                    console.log(`Choosen value for Y-axes: ${title}`);
                                    props.setSelectedYAxes(title)
                                }} >{title}
                                </DropdownItem>
                            );
                        })}
                    </DropdownButton>
                </>
            );
        case "Pie Chart":
            return (
                <>
                    <DropdownButton id="dropdown-basic-button" title="Select values">
                    {titles.map((title) => {
                            return (
                                <DropdownItem key={Date.now() + Math.random()} onClick={e => {
                                    console.log(`Choosen value: ${title}`);
                                    props.setSelectedXAxes(title);
                                }} >{title}
                                </DropdownItem>
                            );
                        })}
                    </DropdownButton>
                </>
            );
        default:
            return (
                <>
                <h1>No selected chart</h1>
                </>
            )

    }
};

export default Dropdown;

            // <DropdownButton id="dropdown-basic-button" title="Dropdown button">
            //     <DropdownItem href="#/action-1">Action</DropdownItem>
            //     <DropdownItem href="#/action-2">Another action</DropdownItem>
            //     <DropdownItem href="#/action-3">Something else</DropdownItem>
            // </DropdownButton>
