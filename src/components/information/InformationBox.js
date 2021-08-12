import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'

import { faInfoCircle } from '@fortawesome/free-solid-svg-icons'

import styles from './InformationBox.module.css'
import InformationModal from './InformationModal';

export default function InformationBox(props) {
    const modalTitle = props.modalTitle;
    const modalTextBody = props.modalTextBody;
    const modalButtonText = props.modalButtonText;
    const modalList = props.modalTextBodyList

    const [shouldShowInformation, setShouldShowInformation] = useState(false);


    const toggleInformation = () => {
        setShouldShowInformation(!shouldShowInformation);
    }
    return (
        <div className={styles.container}>
            <div className={styles.icon}>
               <FontAwesomeIcon icon={faInfoCircle} color="#1C77FF"/> 
            </div>
            <p className={styles.text}>{props.text}</p>
            <button className={styles.link} onClick={toggleInformation}>{props.link}</button>
            <InformationModal shouldBeVisible={shouldShowInformation} 
                textBody={modalTextBody} 
                toggleVisible={toggleInformation}
                title={modalTitle}
                buttonText={modalButtonText}
                list={modalList}/>
        </div>
    )
}

InformationBox.defaultProps = {
    text:"Informasjon"
}