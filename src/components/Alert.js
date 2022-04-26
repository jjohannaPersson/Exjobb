import React from 'react';
import { Alert } from 'react-bootstrap';

const AlertBox = (props) => {
    const { message, show, setShow } = props;

    if (show) {
    return (
        <Alert variant={message.type} onClose={() => setShow(false)} dismissible>
        <Alert.Heading>{message.title}</Alert.Heading>
        <p>{message.text}</p>
        </Alert>
    );
    }
    return null;
};

export default AlertBox;
