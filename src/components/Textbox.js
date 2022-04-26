import React from "react";

import { Rnd } from 'react-rnd';
import ContentEditable from 'react-contenteditable'



function Textbox(props) {
    const { textInput, isActive } = props;

    const handleChange = evt => {
      textInput.current = evt.target.value;
    };
    return (
        <>
        <Rnd
          default={{
            x: 150,
            y: 200,
            width: 300,
            height: 200,
          }}
          minWidth={100}
          minHeight={50}
          bounds=".content"
        >
          <ContentEditable
          onChange={handleChange}
          html={textInput.current}
          className="text-box"
          style={isActive ? {"display": "none"} : {"display": "block"}}
          />
        </Rnd>
        </>
    )

}

export default Textbox;