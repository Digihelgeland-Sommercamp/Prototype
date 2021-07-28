import { Checkbox } from '@material-ui/core'
import React from 'react'

import styles from './Kid.module.css'

export default function Kid(props) {
    return (
        <div className={styles.container}>
            <Checkbox
                className={styles.checkBox}
                value="CheckedKid"
                inputProps={{ 'aria-label': props.name }}
            />
            <div className={styles.textContainer}>
            <h2>{props.name}</h2>
            <p>{`f. ${props.born}`}</p>
            </div>
            
            
        </div>
    )
}
