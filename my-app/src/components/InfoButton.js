import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import React from 'react';


function InfoButton() {
    return(
        <div style={{alignSelf:"center", paddingBottom:"20px", paddingLeft:"20px"}}>
            <FontAwesomeIcon icon={faInfoCircle}/> 
        </div>
         
    )
}

export default InfoButton