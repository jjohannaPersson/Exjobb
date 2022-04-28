import React from "react";

import ContentEditable from 'react-contenteditable'


function Description(props) {
    const { descriptionInput } = props;

    const handleChange = evt => {
      descriptionInput.current = evt.target.value;
    };
    return (
        <>
          <ContentEditable
          onChange={handleChange}
          html={descriptionInput.current}
          className="description"
          // style={isActive ? {"display": "none"} : {"display": "block"}}
          />
        </>
    )

}

export default Description;