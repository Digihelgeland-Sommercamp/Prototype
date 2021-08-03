import { useState } from 'react';
import React from 'react'
import styles from './RadioBox.module.css'
import { Radio } from '@material-ui/core'


function RadioBox(props) {
    const [radioText, setRadioText] = useState(props.radioText);
    const [identifier, setIdentifier] = useState(props.identifier)

    const handleChange = (event) => {
        props.onClickRadioButton(identifier)
    }

    return (
        <div>
            <div className={styles.container} onClick={handleChange} identifier={identifier}>
                <div className={props.selected ? styles.boxActive : styles.box}>
                    <Radio color="default" checked={props.selected}/>
                    <div className={styles.text}>{radioText} </div>
                </div>
            </div>
        </div>
    )
}

export default RadioBox;