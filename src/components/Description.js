import React from "react";

import ContentEditable from 'react-contenteditable'


function Description(props) {
    const { descriptionInput, isVisible, currentGraph } = props;

    const handleChange = evt => {
      descriptionInput.current = evt.target.value;
    };
    return (
        <>
          <ContentEditable
          onChange={handleChange}
          html={descriptionInput.current}
          className={`description-${currentGraph}`}
          style={isVisible ? {"visibility": "hidden"} : {"display": "block"}}
          />
        </>
    )

}

export default Description;