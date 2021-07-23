import React from 'react'

import styles from './ApplicationExcerpt.module.css'

export default function ApplicationExcerpt(props) {
    return (
        <div className={styles.wrapper}>
            <div className={styles.info + ' ' + (props.changeOrCheck ? styles.new : styles.old)}>
                <p className={styles.applicationName}>{props.applicationName}</p>
                <p className={styles.date}>{props.date}</p>
            </div>
            {props.changeOrCheck 
                ?
               <p className={styles.extra}>Sist endret: {props.changedDate}</p>
                :
               <a className={styles.extra}>Se digipost</a>
            }
            
        </div>
    )
}
