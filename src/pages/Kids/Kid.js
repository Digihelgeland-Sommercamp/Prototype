import { identifier } from '@babel/types'
import { Checkbox } from '@material-ui/core'
import React, { useState } from 'react'
import '../../components/checkBoxField/CheckBoxField.js'
import CheckBoxField from '../../components/checkBoxField/CheckBoxField.js'

import styles from './Kid.module.css'

export default function Kid(props) {
    const [clicked, setClicked] = useState(false);

    const handleClicked = (isClicked, identifier ) => {
        setClicked(isClicked);
    }

    return (
        <CheckBoxField name={props.name} birth={props.born} onClickCheckbox={handleClicked}/>

        // <div className={styles.container} onClick={()=>setClicked(!clicked)}>
        //     <Checkbox
        //         className={styles.checkBox}
        //         value="CheckedKid"
        //         inputProps={{ 'aria-label': props.name }}
        //         checked={clicked}
        //     />
        //     <div className={styles.textContainer}>
        //     <h2>{props.name}</h2>
        //     <p>{`f. ${props.born}`}</p>
        //     </div>
            
            
        // </div>
    )
}
