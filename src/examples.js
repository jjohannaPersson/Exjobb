import React from "react";
import Button from 'react-bootstrap/Button';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import { LinkContainer } from 'react-router-bootstrap';

function Examples() {
    return (
        <div className="header">
            <h1>Välj ett exempel att visa</h1>
            <ButtonToolbar className="custom-btn-toolbar">
            <LinkContainer to="/">
              <Button>Startsida</Button>
            </LinkContainer>
              <LinkContainer to="/simple">
                <Button>Simple Bar Chart</Button>
              </LinkContainer>
              <LinkContainer to="/bar">
                <Button>Bar Charts</Button>
              </LinkContainer>
              <LinkContainer to="/pie">
                <Button>Pie Chart</Button>
              </LinkContainer>
            </ButtonToolbar>
        </div>
    );
}

export default Examples;
