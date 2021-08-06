import React from 'react'

import styles from './ApplicationExcerpt.module.css'

export default function ApplicationExcerpt(props) {

    const excerptClicked = () => {
        props.excerptClicked(props.arr, props.index)
    }

    return (
        <div className={styles.container +  ' ' + (props.changeOrCheck ? styles.new : styles.old)}  onClick={() => excerptClicked()}>
            <h3 className={styles.applicationName}>{props.applicationName}</h3>
            <div className={styles.info}>
                <p className={styles.date}>{props.date}</p>
            </div>
            <p className={styles.status}>{props.status}</p>
            <button className={styles.link}>Vis mer</button>

        </div>
        
    )
}
