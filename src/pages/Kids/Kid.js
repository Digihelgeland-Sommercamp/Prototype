import { Checkbox } from '@material-ui/core'
import React from 'react'

import styles from './Kid.module.css'

export default function Kid(props) {
    return (
        <div className={styles.container}>
            <h2>{props.name}</h2>
            <p>{`f. ${props.born}`}</p>
            <div className={styles.cbContainer}>
                <Checkbox
                className={styles.checkBox}
                value="CheckedKid"
                inputProps={{ 'aria-label': props.name }}

                />
            </div>
            
        </div>
    )
}
