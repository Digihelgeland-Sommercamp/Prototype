import React from 'react'

import styles from './ApplicationExcerpt.module.css'

export default function ApplicationExcerpt(props) {

    const excerptClicked = () => {
        props.excerptClicked(props.arr, props.index)
    }

    return (
        <div className={styles.container +  ' ' + (props.changeOrCheck ? styles.new : styles.old)}  onClick={() => excerptClicked()}>
            <div className={styles.info}>
                <p className={styles.applicationName}>{props.applicationName}</p>
                <p className={styles.date}>{props.date}</p>
            </div>
            <button className={styles.link}>Vis mer</button>

        </div>
        
    )
}
