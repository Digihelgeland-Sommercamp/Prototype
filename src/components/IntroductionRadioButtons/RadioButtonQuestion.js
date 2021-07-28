import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDotCircle } from '@fortawesome/free-solid-svg-icons'

function RadioButtonQuestion(props) {

    const handleClick = () => {
        props.onClick && props.onClick(props.id)
    }

    return (
        <a onClick={() => handleClick()}>
            <div style={{ maxWidth: "80%", margin: "0 auto" }}>
                <div style={{ display: "flex", alignItems: "center", padding: "30px", margin: "10px", border: "solid 2px grey" }}>
                    <button></button>
                    <FontAwesomeIcon icon={faDotCircle} />
                    <p style={{ marginLeft: "20px" }}>{props.context}</p>
                </div>
                <a>{props.info}</a>
            </div>
        </a>

    )
}

export default RadioButtonQuestion