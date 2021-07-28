import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen } from '@fortawesome/free-solid-svg-icons'


function ChangeButton() {
    return(
        <div style={{display:"flex", justifyContent:"flex-end", alignItems:"center"}}>
            <FontAwesomeIcon icon={faPen} />
            <p style={{marginLeft:"10px", textDecoration:"underline"}}>Endre</p>
        </div>  
    )
}

export default ChangeButton