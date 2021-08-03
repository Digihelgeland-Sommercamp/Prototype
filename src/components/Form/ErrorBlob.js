import React from 'react'

import styles from './ErrorBlob.module.css'

export default function ErrorBlob(props) {
    return (
        <div className={styles.container}>
            <p>{props.firstText}</p>
            <p>{props.secondText}</p>
        </div>
    )
}
