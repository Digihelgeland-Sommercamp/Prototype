import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

import { faInfoCircle } from '@fortawesome/free-solid-svg-icons'

import styles from './InformationBox.module.css'

export default function InformationBox(props) {
    return (
        <div className={styles.container}>
            <div className={styles.icon}>
               <FontAwesomeIcon icon={faInfoCircle} color="#1C77FF"/> 
            </div>
            <p className={styles.text}>{props.text}</p>
            <a className={styles.link}>{props.link}</a>
        </div>
    )
}

InformationBox.defaultProps = {
    text:"Informasjon",
    link:"Les mer..."
}