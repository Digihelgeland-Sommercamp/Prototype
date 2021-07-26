import { useState } from 'react';
import React from 'react'
import styles from './RadioBox.module.css'
import { useReducer } from 'react';
// import Radio from '@material-ui/core/Radio'
import { FormControl, RadioGroup, FormControlLabel, Radio } from '@material-ui/core'


function RadioBox(props) {
    const [radioText, setRadioText] = useState(props.radioText);
    const [identifier, setIdentifier] = useState(props.identifier)

    const handleChange = (event) => {
        props.onClickRadioButton(identifier)
    }

    console.log("selected in box: " + props.selected)

    return (
        <div>
            <div className={styles.container} onClick={handleChange} identifier={identifier}>
                <div className={styles.box}>
                    <div className={styles.text}>{radioText} </div>
                    
                    <Radio checked={props.selected} className={styles.radioButton}/>
                </div>
            </div>
        </div>

    // <div className="radioButtons">
    //     <FormControl component="fieldset">
    //         <RadioGroup aria-label="partner" name="gender1" value={value} onChange={handleChange}>
    //             <FormControlLabel 
    //                 value={radioText}
    //                 label="Husholdningen har hatt stabil inntekt siden forrige skatteoppgjør." 
    //                 control={<Radio color="default" />} 
    //                 labelPlacement="start"
    //                 className={ // Add a way to set button active / not active
    //                     // value == firstValue ? 'radioButton active' : 'radioButton'
    //                     'radioButton active'
    //                 } />
    //         </RadioGroup>
    //     </FormControl>
    // </div>
    )
}

export default RadioBox;