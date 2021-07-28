import React from 'react'

import styles from './ProgressBar.module.css'

export default function ProgressBarElement(props) {

    const numberWidth = (1/props.numElem)*100
    const strWidth = String(numberWidth)+"%"

    return (
        <div className={styles.elementWrapper} style={{ width:strWidth}}>
            <div className={styles.fill} style={{background:props.fill ? "red" : "whitesmoke"}}>{props.num}</div>
            <p className={styles.elementText}>{props.text}</p>
            
        </div>
    )
}
