import React, { useState } from 'react';

import { DropdownButton } from 'react-bootstrap';
import DropdownItem from 'react-bootstrap/esm/DropdownItem';

const Dropdown = (props) => {
    let typesOfGraphs = ["Simple Bar Chart","Bar Chart", "Pie Chart"];
    let titles;

    if (props.jsonData) {
        titles = Object.keys(props.jsonData[0]);
    }

    if (!props.selectedGraph) {
        return (
            <>
                <DropdownButton id="dropdown-basic-button" title="Välj graf">
                {typesOfGraphs.map((graph) => {
                        return (
                            <DropdownItem key={Date.now() + Math.random()} onClick={e => {
                                console.log(`Vald graf: ${graph}`);
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
                    <DropdownButton id="dropdown-basic-button" title="Välj X-axel">
                    {titles.map((title) => {
                            return (
                                <DropdownItem key={Date.now() + Math.random()} onClick={e => {
                                    console.log(`Choosen value for X-axes: ${title}`);
                                    props.setSelectedXAxes(title);
                                }} >{title}
                                </DropdownItem>
                            );
                        })}
                    </DropdownButton>
                    <DropdownButton id="dropdown-basic-button" title="Välj Y-axel">
                    {titles.map((title) => {
                            return (
                                <DropdownItem key={Date.now() + Math.random()} onClick={e => {
                                    console.log(`Choosen value for Y-axes: ${title}`);
                                    props.setSelectedYAxes(title)
                                }} >{title}
                                </DropdownItem>
                            );
                        })}
                    </DropdownButton>
                </>
            );
        case "Bar Chart":
            return (
                <>
                    <DropdownButton id="dropdown-basic-button" title="Välj X-axel">
                    {titles.map((title) => {
                            return (
                                <DropdownItem key={Date.now() + Math.random()} onClick={e => {
                                    console.log(`Choosen value for X-axes: ${title}`);
                                    props.setSelectedXAxes(title);
                                }} >{title}
                                </DropdownItem>
                            );
                        })}
                    </DropdownButton>
                    <DropdownButton id="dropdown-basic-button" title="Välj Y-axel">
                    {titles.map((title) => {
                            return (
                                <DropdownItem key={Date.now() + Math.random()} onClick={e => {
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
                    <h1>Pie Chart</h1>
                </>
            );
        default:
            return (
                <>
                <h1>Ingen vald graf</h1>
                </>
            )

    }
};

export default Dropdown;

