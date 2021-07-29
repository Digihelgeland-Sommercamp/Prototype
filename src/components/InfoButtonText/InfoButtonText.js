import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import React from 'react';

import './InfoButtonText.css'

export default function InfoButtonText(props) {
    return(
        <div className="info_wrapper" >
            <FontAwesomeIcon icon={faInfoCircle}/>
            <p className="info_text">{props.text}</p>
        </div>
    )
}

 